import React from "react";
import styled from "styled-components";

const StyledTweet = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #ccd6dd;
  border-radius: 0.5em;
`;

const StyledImage = styled.img`
  height: 4em;
  width: 4em;
  margin-right: 1em;
  border-radius: 100%;
`;

const StyledTweetBody = styled.div`
  width: calc(100% - 5em);
  max-width: calc(100% - 5em);
`;

const StyledUsername = styled.h2`
  margin: 0;
  margin-bottom: 0.5em;
  word-break: break-all;
`;

const StyledText = styled.div`
  padding: 0.75em 1em;
  border-radius: 0.3em;
  background: #e6ecf0;
`;

const Tweet = ({ image, text, username }) => {
  return (
    <StyledTweet>
      <StyledImage src={image} />
      <StyledTweetBody>
        <StyledUsername>{username}</StyledUsername>
        <StyledText>{text}</StyledText>
      </StyledTweetBody>
    </StyledTweet>
  );
};

export default Tweet;
