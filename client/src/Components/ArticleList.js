import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledList = styled.div`
  padding: 1rem;
  margin: 1rem;
  & a {
    text-decoration: none;
    color: black;
  }
`;

const StyledImg = styled.img`
  width: 20rem;
  height: 20rem;
`;

const StyledName = styled.div`
  font-size: 1.5rem;
`;

const ArticleList = ({ comment }) => {
  return (
    <StyledList>
      <Link to={`/article/${comment.id}`}>
        <StyledImg src={comment.img} />
        <StyledName>{comment.title}</StyledName>
        <i className="far fa-comment"></i>
        {comment.totalcomments}
      </Link>
    </StyledList>
  );
};

export default ArticleList;
