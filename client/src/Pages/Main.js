import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import ArticleList from "../Components/ArticleList";

import dummy from "../dummy/dummy";

const StyledMain = styled.div``;

const StyledBody = styled.div`
  background-color: #f4eae0;
  display: table-cell;
  width: 100%;
`;

const StlyedArticle = styled.div`
  padding-bottom: 2rem;
`;

const StyledImg = styled.div`
  background-image: url("https://i.ibb.co/x5HNV5z/bride-g8bfa369fe-1920.jpg");
  background-position: center;
  background-size: cover;
  padding: 20rem;
  opacity: 0.8;
`;

const StyledMiddle = styled.div`
  background-color: #f4eae0;
  padding: 2rem;
`;

const Styledbutton1 = styled.button`
  padding: 10px;
  border-radius: 5px;
  background-color: transparent;
  font-size: 1rem;
  margin: 0rem 0.5rem;
`;

const Styledbutton2 = styled.button`
  padding: 10px;
  border-radius: 5px;
  background-color: lightgray;
  border: 1px solid lightgray;
  float: right;
  font-size: 1rem;
  & a {
    text-decoration: none;
    color: black;
  }
`;

const Main = () => {
  return (
    <StyledMain>
      <StyledBody>
        <StyledImg />
        <StyledMiddle>
          <Styledbutton1>댓글순</Styledbutton1>
          <Styledbutton1>조회순</Styledbutton1>
          <Styledbutton2>
            <Link to="/write">글쓰기</Link>
          </Styledbutton2>
        </StyledMiddle>
        <StlyedArticle>
          {dummy.map(dummy => {
            return <ArticleList dummy={dummy} key={dummy.id} />;
          })}
        </StlyedArticle>
      </StyledBody>
    </StyledMain>
  );
};

export default Main;
