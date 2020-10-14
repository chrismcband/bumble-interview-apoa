import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  max-width: min(65ch, 90vw);
  min-height: 100vh;
  margin: auto;
  padding: 1rem 0;
`;

const Layout = ({ children }) => {
  return (
    <StyledWrapper>
        {children}
    </StyledWrapper>
  );
};

export default Layout;
