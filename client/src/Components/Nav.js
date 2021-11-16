import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import dummy from "../dummy/dummy";
import axios from "axios";

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

const Nav = ({ isLogin, userInfoHandler, setIsLogin, check }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    axios
      .post("http://localhost:4000/auth/logout", null, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.message);
        const resMsg = res.data.message;
        if (resMsg === "logout success!") {
          const userInfo = {
            email: "",
            name: "",
            nickname: "",
            mobile: "",
            image: "",
          };
          console.log("잘가~!");
          userInfoHandler(userInfo);
          setIsLogin(false);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      {isOpen ? (
        <LoginModal
          openModalHandler={openModalHandler}
          userInfoHandler={userInfoHandler}
          setIsLogin={setIsLogin}
          check={check}
        />
      ) : null}
      <StyledNav>
        <StyledLink1>
          <Link to="/">Onwedding</Link>
        </StyledLink1>

        {/* <a onClick={check}> 로그인상태체크 </a>
        <a onClick={openModalHandler}>login</a>
        <Link to="/signup">SignUp</Link> */}

        <StyledLink2>
          {/* <Link to="/signup">login</Link>
        <Link to="/signup">signup</Link> */}

          {!isLogin ? (
            <>
              <a onClick={check}> 로그인상태체크 </a>
              <a onClick={openModalHandler}>login</a>
              <Link to="/signup">SignUp</Link>
            </>
          ) : (
            <li>
              <div>
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
              </div>
            </li>
          )}

          {/* <li>
            <div>
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
            </div>
          </li> */}
        </StyledLink2>
      </StyledNav>
    </>
  );
};

export default Nav;
