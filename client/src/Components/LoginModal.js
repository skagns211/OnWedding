import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

const ModalContainer = styled.div`
  //!Modal 구현 css
  background-color: white;
  border-radius: 5%;
  width: 30%;
  min-width: 300px;
  max-width: 600px;
  height: 70%;
  overflow-y: auto;
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 5px;
  transform: translate(-50%, -50%);
  z-index: 1011;
`;

const ModalBackdrop = styled.div`
  //! Modal backdrop css
  width: 100%;
  height: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1010;
  background-color: rgba(0, 0, 0, 0.65);
`;

const LoginModal = ({ openModalHandler, userInfoHandler, setIsLogin }) => {
  const [loginUserInfo, setLoginUserInfo] = useState({
    email: "",
    password: "",
  }); //! 유저 로그인 info state

  const [isLogEmail, setIsLogEmail] = useState(false); //! 이메일 입력 state
  const [isLogPassword, setIsLogPassword] = useState(false); //! 패스워드 입력 state
  const [emailMessage, setEmailMessage] = useState("");
  const [invalidMessage, setInvalidMessage] = useState("");

  const handleInputValue = (key) => (e) => {
    setLoginUserInfo({ ...loginUserInfo, [key]: e.target.value });
  };

  const validEmail = (email) => {
    const regEmail =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (regEmail.test(email) === false) {
      setIsLogEmail(false);
      setEmailMessage("올바른 이메일 형식이 아닙니다.");
    } else {
      setIsLogEmail(true);
      setEmailMessage("");
    }
  };

  const passwordState = () => {
    if (loginUserInfo.password.length !== 0) {
      setIsLogPassword(true);
    } else {
      setIsLogPassword(false);
    }
  };

  const infoAll = () => {
    const stateInfo = {
      email: [loginUserInfo.email, isLogEmail],
      password: [loginUserInfo.password, isLogPassword],
    };

    axios
      .post(
        "https://localhost:4000/auth/login",
        {
          email: loginUserInfo.email,
          password: loginUserInfo.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.message === "invalid data") {
          console.log("로그인 요청이 실패하였습니다.");
          setInvalidMessage(
            "아이디 또는 비밀번호가 잘못 입력 되었습니다.아이디와 비밀번호를 정확히 입력해 주세요"
          );
        } else {
          //! isLogin 상태를 변경해줘야함
          //! axios get 요청을 보내고 받은 응답 유저인포를 전역에서 프롭스로 받아온 핸들러로 스테이트 변경

          axios
            .get("https://localhost:4000/user", { withCredentials: true })
            .then((res) => {
              console.log("로그인 요청이 성공적으로 전달되었습니다.");
              // console.log(res.data.data.userInfo);
              const { id, email, name, nickname, mobile, image } =
                res.data.data.userInfo;
              const userInfo = { id, email, name, nickname, mobile, image };
              userInfoHandler(userInfo);
              setIsLogin(true);
              openModalHandler();
              // console.log(userInfo);
            })
            .catch((err) => {
              throw err;
            });
        }
        // console.log(stateInfo);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      <ModalBackdrop
        onClick={() => {
          openModalHandler();
        }}
      ></ModalBackdrop>
      <ModalContainer>
        <>
          <center>
            <div> 로그인</div>
            <div>OnWedding 커뮤니티에 로그인하세요!</div>
            <div>
              <div>이메일</div>
              <input
                type="text"
                placeholder="Email"
                onChange={handleInputValue("email")}
                onBlur={() => validEmail(loginUserInfo.email)}
              />
              {isLogEmail ? (
                <div>{emailMessage}</div>
              ) : loginUserInfo.email.length === 0 ? null : (
                <div>{emailMessage}</div>
              )}
            </div>
            <div>
              <div>비밀번호</div>
              <input
                type="password"
                placeholder="Password"
                onChange={handleInputValue("password")}
                onBlur={() => passwordState()}
              />
              {invalidMessage !== "" ? <div>{invalidMessage}</div> : null}
            </div>
            <button
              type="submit"
              className="postLogin"
              onClick={() => {
                infoAll();
              }}
            >
              로그인
            </button>
            <div>아직 회원이 아니신가요?</div>
            {/* <button type="submit" className="linkToSignup">
              OnWedding 회원가입
            </button> */}
            <Link to="/signup" onClick={openModalHandler}>
              OnWedding 회원가입
            </Link>
          </center>
        </>
      </ModalContainer>
    </>
  );
};

export default LoginModal;
