import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import dummy from "../dummy/dummy";

const StyledNav = styled.header`
  z-index: 1;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4eae0;
  max-width: 75%;
  margin: 0 auto;
  overflow: visible;
`;

const StyledLink1 = styled.div`
  padding-left: 0rem;
  & a {
    text-decoration: none;
    color: black;
  }
`;

const StyledLink2 = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  > li:hover ul {
    opacity: 1;
    visibility: visible;
  }
  > li {
    > div {
      padding: 1rem;
      > img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
      > ul {
        border-radius: 10%;
        width: 6rem;
        margin: 0;
        padding: 1rem 1rem;
        list-style: none;
        opacity: 0;
        visibility: hidden;
        background-color: white;
        float: left;
        position: absolute;
        z-index: 999;
        > li {
          padding: 0.5rem 0rem;
          > a {
            padding: 0.5rem;
            text-decoration: none;
            color: black;
          }
          > a:hover {
            background-color: #f4eae0;
          }
        }
      }
    }
  }
`;

const Nav = () => {
  return (
    <StyledNav>
      <StyledLink1>
        <Link to="/">Onwedding</Link>
      </StyledLink1>
      <StyledLink2>
        {/* <Link to="/signup">login</Link>
        <Link to="/signup">signup</Link> */}
        <li>
          <div>
            <img src={dummy[0].img} />
            <ul>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
              <li>
                <Link to="/mypage">로그아웃</Link>
              </li>
            </ul>
          </div>
        </li>
      </StyledLink2>
    </StyledNav>
  );
};

export default Nav;
