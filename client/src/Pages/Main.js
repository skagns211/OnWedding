import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import ArticleList from "../Components/ArticleList";

const StyledBody = styled.main`
  max-width: 75%;
  margin: 0 auto;
`;

const StlyedArticle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  max-width: 100%;
  margin: 0 auto;
`;

const StyledImg = styled.section`
  background-image: url("https://i.ibb.co/x5HNV5z/bride-g8bfa369fe-1920.jpg");
  background-position: center;
  background-size: contain auto;
  background-repeat: no-repeat;

  padding: 10rem;
  opacity: 0.8;
  position: relative;
`;

const StyledMiddle = styled.div`
  background-color: #f4eae0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
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
    border-radius: 10%;
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

const Main = ({ isLogin }) => {
  const [articles, setArticles] = useState("");

  useEffect(() => {
    axios.get("http://ec2-3-21-167-88.us-east-2.compute.amazonaws.com/article").then(res => {
      setArticles(res.data.data.articles);
    });
  }, []);

  const OrderCreated = () => {
    const arrCopy = articles.slice();
    const sorted = arrCopy.sort((a, b) => a.id - b.id);
    setArticles(sorted);
  };

  const OrderTotalComments = () => {
    const arrCopy = articles.slice();
    const sorted = arrCopy.sort((a, b) => b.total_comment - a.total_comment);
    setArticles(sorted);
  };

  return (
    <StyledBody>
      <StyledImg />
      <StyledMiddle>
        <Styledbutton1>
          <li onClick={OrderCreated}>최신순</li>
          <li onClick={OrderTotalComments}>댓글순</li>
        </Styledbutton1>

        {isLogin ? (
          <Styledbutton2>
            <Link to="/write">글쓰기</Link>
          </Styledbutton2>
        ) : null}
      </StyledMiddle>
      <StlyedArticle>
        {articles ? (
          articles.map(article => {
            return <ArticleList article={article} key={article.id} />;
          })
        ) : (
          <div>없어요</div>
        )}
      </StlyedArticle>
    </StyledBody>
  );
};

export default Main;
