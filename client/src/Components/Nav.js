import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import dummy from "../dummy/dummy";
import axios from "axios";

const NavBody = styled.header`
  z-index: 1;
  position: sticky;
  top: 0;
  background-color: #f4eae0;
  overflow: visible;
  width: 75%;
  max-width: 120rem;
  margin: 0 auto;
  padding-left: 0.5rem;
`;

const StyledLink2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin: 0;
  a {
    text-decoration: none;
    color: black;
  }
  span {
    margin: 0.5rem;
  }
`;

const UserInfo = styled.div`
  :hover ul {
    opacity: 1;
    visibility: visible;
  }
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  li {
    padding: 0.5rem 0;
  }
  ul {
    border-radius: 10%;
    width: 6rem;
    margin: 0;
    padding: 1rem 1rem;
    list-style: none;
    position: absolute;
    z-index: 999;
    background-color: white;
    opacity: 0;
    visibility: hidden;
  }
  a {
    padding: 0.5rem;
  }
  a:hover {
    background-color: #f4eae0;
  }
`;

const Nav = ({ isLogin, userInfoHandler, setIsLogin, setTagArticles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    axios
      .post("https://localhost:4000/auth/logout", null, {
        withCredentials: true,
      })
      .then(res => {
        const resMsg = res.data.message;
        if (resMsg === "logout success!") {
          const userInfo = {
            email: "",
            name: "",
            nickname: "",
            mobile: "",
            image: "",
          };
          userInfoHandler(userInfo);
          setIsLogin(false);
        }
      })
      .catch(err => {
        throw err;
      });
  };

  const handlehome = () => {
    setTagArticles("");
  };

  return (
    <NavBody>
      {isOpen ? (
        <LoginModal
          openModalHandler={openModalHandler}
          userInfoHandler={userInfoHandler}
          setIsLogin={setIsLogin}
        />
      ) : null}

      <StyledLink2>
        <div onClick={handlehome}>
          <Link to="/">Onwedding</Link>
        </div>
        <div>
          {!isLogin ? (
            <>
              <span>
                <a onClick={openModalHandler}>login</a>
              </span>
              <span>
                <Link to="/signup">SignUp</Link>
              </span>
            </>
          ) : (
            <UserInfo>
              <img src={dummy[0].img} />
              <ul>
                <li>
                  <Link to="/mypage">마이페이지</Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={() => {
                      logoutHandler();
                    }}
                  >
                    로그아웃
                  </Link>
                </li>
              </ul>
            </UserInfo>
          )}
        </div>
      </StyledLink2>
    </NavBody>
  );
};

export default Nav;
