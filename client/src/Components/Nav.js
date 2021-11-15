import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4eae0;
  max-width: 75%;
  margin: 0 auto;
`;

const StyledLink1 = styled.div`
  padding-left: 0rem;

  & a {
    text-decoration: none;
    color: black;
  }
`;

const StyledLink2 = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;

  & a {
    padding: 1rem;
    text-decoration: none;
    color: black;
  }
`;

const Nav = () => {
  return (
    <StyledNav>
      <StyledLink1>
        <Link to="/">Onwedding</Link>
      </StyledLink1>
      <StyledLink2>
        <Link to="/signup">login</Link>
        <Link to="/signup">signup</Link>
      </StyledLink2>
    </StyledNav>
  );
};

export default Nav;
