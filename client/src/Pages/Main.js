import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

import ArticleList from "../Components/ArticleList";

import dummy from "../dummy/dummy";

const StlyedArticle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const StyledImg = styled.div`
  background-image: url("https://i.ibb.co/x5HNV5z/bride-g8bfa369fe-1920.jpg");
  background-position: center;
  background-size: contain auto;
  background-repeat: no-repeat;
  padding: 20rem;
  opacity: 0.8;
`;

const StyledMiddle = styled.div`
  background-color: #f4eae0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Styledbutton1 = styled.ul`
  margin: 2rem 0rem 0rem 2rem;
  padding-left: 0;
  display: flex;
  border-radius: 5px;
  background-color: transparent;
  font-size: 1.5rem;
  & li {
    list-style: none;
    padding: 1rem 1.5rem;
  }
  & li:hover {
    background-color: white;
    cursor: pointer;
  }
`;

const Styledbutton2 = styled.button`
  margin: 2rem 2rem 0rem 0rem;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  background-color: lightgray;
  border: 1px solid lightgray;
  font-size: 1.5rem;
  & a {
    text-decoration: none;
    color: black;
  }
`;

const Main = () => {
  const [comments, setComments] = useState(dummy);

  const commentsOrder = () => {
    const arr = dummy.slice();
    const result = arr.sort((a, b) => b.totalcomments - a.totalcomments);
    setComments(result);
  };

  const createdOrder = () => {
    const arr = dummy.slice();
    const result = arr.sort((a, b) => a.id - b.id);
    setComments(result);
  };

  return (
    <div>
      <StyledImg />
      <StyledMiddle>
        <Styledbutton1>
          <li onClick={createdOrder}>최신순</li>
          <li onClick={commentsOrder}>댓글순</li>
        </Styledbutton1>
        <Styledbutton2>
          <Link to="/write">글쓰기</Link>
        </Styledbutton2>
      </StyledMiddle>
      <StlyedArticle>
        {comments.map(comment => {
          return <ArticleList comment={comment} key={comment.id} />;
        })}
      </StlyedArticle>
    </div>
  );
};

export default Main;
