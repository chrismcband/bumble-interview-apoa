import React, { useEffect, useReducer, useState } from "react";

import Layout from "./components/Layout";
import { Tweet } from "./components/Tweet";
import { ACTION_TYPE } from "./constants/ActionType";
import { useInterval } from "./hooks/useInterval";

const API_BASE_URL = "https://bumble-twitter-interview.herokuapp.com/apoa-falby";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_TWEET:
      return action.payload.concat(state);
    default: 
      throw new Error("You must use one of the enumerated ACTION_TYPES");
  }
};

function App() {
  const [twitterFeed, dispatch] = useReducer(reducer, []);
  const [isLoading, setLoading] = useState(false);
  const [isFirstFetch, setFirstFetch] = useState(true);
  const [latestTweetId, setLatestTweetId] = useState();

    const fetchTweets = async () => {
      if (isLoading) {
        return;
      }
      setLoading(true);
      // fetch 20 on page load, then 1 at a time after
      const count = isFirstFetch ? 20 : 1;
      setFirstFetch(false);

      const afterIdParam = latestTweetId ? `&afterId=${latestTweetId}` : "";
      const response = await fetch(`${API_BASE_URL}/api?count=${count}${afterIdParam}`, {
        method: "GET"
      });
      if (response) {
        if (response.status === 200) {
          const data = await response.json();
          if (data?.length > 0) {
            setLatestTweetId(data[0].id);
            dispatch({
              type: ACTION_TYPE.ADD_TWEET,
              payload: data,
            });
            setLoading(false);
          } else {
            if (count === 20) {
              // reset first fetch if nothing is retrieved
              setFirstFetch(true);
            }
            if (latestTweetId > 9999) {
              // reset database when it maxes out
              setLatestTweetId();
              fetch(`${API_BASE_URL}/reset`);
            }
            setLoading(false);
          } 
        } else {
          if (count === 20) {
            // reset first fetch if api call fails
            setFirstFetch(true);
          }
          setLoading(false);
        }
      }
    };

    useEffect(() => {
      fetchTweets();
    }, []);

    useInterval(() => {
      fetchTweets();
    }, 2000);
  
  return (
    <Layout>
      {twitterFeed.map(({id, image, text, username}) => {
        return (
          <Tweet 
            key={id}
            image={image} 
            text={text} 
            username={username} />
        );
      })}
    </Layout>
  );
}

export default App;
