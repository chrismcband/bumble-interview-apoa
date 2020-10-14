import React, { useEffect, useReducer, useState, useRef } from "react";

import Layout from "./components/Layout";
import { Tweet } from "./components/Tweet";
import { ACTION_TYPE } from "./constants/ActionType";
import { useInterval } from "./hooks/useInterval";

const API_BASE_URL =
  "https://bumble-twitter-interview.herokuapp.com/apoa-falby";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_TWEET:
      return action.payload.concat(state);
    case ACTION_TYPE.ADD_PREVIOUS_TWEETS:
      return state.concat(action.payload);
    default:
      throw new Error("You must use one of the enumerated ACTION_TYPES");
  }
};

function App() {
  const [twitterFeed, dispatch] = useReducer(reducer, []);
  const [isLoading, setLoading] = useState(false);
  const [isFirstFetch, setFirstFetch] = useState(true);
  const [latestTweetId, setLatestTweetId] = useState();
  const [firstTweetId, setFirstTweetId] = useState();
  const [delay, setDelay] = useState(0);
  const [loadPrevious, setLoadPrevious] = useState(false);
  const bodyRef = useRef();

  const fetchTweets = async () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    // fetch 20 on page load, then 1 at a time after
    const count = isFirstFetch ? 20 : 1;

    const afterIdParam =
      !loadPrevious && latestTweetId ? `&afterId=${latestTweetId}` : "";
    const beforeIdParam =
      loadPrevious && firstTweetId ? `&beforeId=${firstTweetId}` : "";
    const response = await fetch(
      `${API_BASE_URL}/api?count=${count}${afterIdParam}${beforeIdParam}`,
      {
        method: "GET"
      }
    );
    if (response) {
      if (response.status === 200) {
        const data = await response.json();
        if (data?.length > 0) {
          if (loadPrevious) {
            console.log("loadPrev");
            dispatch({
              type: ACTION_TYPE.ADD_PREVIOUS_TWEETS,
              payload: data
            });
            setDelay(null);
            setLoadPrevious(false);
            setFirstTweetId(data[data.length - 1].id);
          } else {
            console.log("loadNext");
            console.log(data[0].id);
            console.log(data);
            setLatestTweetId(data[0].id);
            dispatch({
              type: ACTION_TYPE.ADD_TWEET,
              payload: data
            });
          }

          if (isFirstFetch) {
            setFirstTweetId(data[data.length - 1].id);
            setFirstFetch(false);
          }
          setLoading(false);
        } else {
          if (latestTweetId > 9999) {
            // reset database when it maxes out
            setLatestTweetId();
            fetch(`${API_BASE_URL}/reset`);
          }
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!isFirstFetch) {
      setDelay(2000);
    }
  }, [isFirstFetch]);

  useEffect(() => {
    const getScrollPosition = () => {
      if (window.scrollY === 0) {
        console.log("top position");
        setDelay(2000);
        setLoadPrevious(false);
      } else if (bodyRef.current?.clientHeight - window.scrollY < 1000) {
        setDelay(1000);
        setLoadPrevious(true);
      } else {
        console.log(
          "height: " +
            bodyRef.current?.clientHeight +
            "scrollY: " +
            window.scrollY
        );
        setDelay(null);
        setLoadPrevious(false);
      }
    };
    window.addEventListener("scroll", getScrollPosition);
    return () => window.removeEventListener("scroll", getScrollPosition);
  }, []);

  useInterval(() => {
    fetchTweets();
  }, delay);

  return (
    <Layout>
      <div ref={bodyRef}>
        {twitterFeed.map(({ id, image, text, username }) => {
          return (
            <Tweet key={id} image={image} text={text} username={username} />
          );
        })}
      </div>
    </Layout>
  );
}

export default App;
