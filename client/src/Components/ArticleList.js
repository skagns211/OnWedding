import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledList = styled.div`
  display: inline-block;
  width: 200px;
  height: 200px;
  margin: 2rem 5rem;
  & a {
    text-decoration: none;
    color: black;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledName = styled.div``;

const ArticleList = ({ dummy }) => {
  return (
    <StyledList>
      <Link to="/article">
        <StyledImg src={dummy.img} />
        <StyledName>{dummy.title}</StyledName>
      </Link>
    </StyledList>
  );
};

export default ArticleList;
