import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ModalContainer = styled.div`
  //!Modal 구현 css
  background-color: #f4eae0;
  border-radius: 5%;
  width: 30%;
  min-width: 25rem;
  max-width: 37.5rem;
  height: 70%;
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 5px;
  transform: translate(-50%, -50%);
  z-index: 1011;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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

const LoginHeader = styled.h1`
  font-size: 2.4rem;
  margin-top: 2em;
`;
const Welcome = styled.div`
  font-size: 1.5rem;
`;
const Element = styled.div`
  min-width: 10rem;
  max-width: 12.5rem;
  font-size: 1.3rem;
  padding-top: 0.625rem;
  margin-top: 0.625rem;
`;
const Inputbox = styled.input`
  width: 18.75rem;
  height: 2.5rem;
  margin-top: 0.2rem;
  border-radius: 0.4rem;
  border: none;
  background-color: white;
  font-size: 1.2rem;
`;
const Button = styled.button`
  width: 6.25rem;
  height: 2.5rem;
  margin-top: 1rem;
  font-size: 1.125rem;
  border-radius: 0.5rem;
`;
const Elementmessage = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.4rem;
`;
const SignupRedirect = styled.div``;

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

  const navigate = useNavigate();

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
          setInvalidMessage("아이디와 비밀번호를 정확히 입력해 주세요");
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

  //! 엔터키 구현
  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      infoAll();
    }
  };

  return (
    <>
      <ModalBackdrop
        onClick={() => {
          openModalHandler();
        }}
      ></ModalBackdrop>
      <ModalContainer welcome>
        <LoginHeader> 로그인 </LoginHeader>
        <Welcome>OnWedding 커뮤니티에 로그인하세요!</Welcome>
        <div>
          <Element> 이메일 </Element>
          <Inputbox
            type="text"
            placeholder="Email"
            onChange={handleInputValue("email")}
            onKeyPress={onCheckEnter}
            onBlur={() => validEmail(loginUserInfo.email)}
          />
          {isLogEmail ? (
            <Elementmessage>{emailMessage}</Elementmessage>
          ) : loginUserInfo.email.length === 0 ? null : (
            <Elementmessage>{emailMessage}</Elementmessage>
          )}
        </div>
        <div>
          <Element> 비밀번호 </Element>
          <Inputbox
            type="password"
            placeholder="Password"
            onChange={handleInputValue("password")}
            onKeyPress={onCheckEnter}
            onBlur={() => passwordState()}
          />
          {invalidMessage !== "" ? (
            <Elementmessage>{invalidMessage}</Elementmessage>
          ) : null}
        </div>
        <Button
          type="submit"
          className="postLogin"
          onClick={() => {
            infoAll();
          }}
        >
          로그인
        </Button>
        <Button
          onClick={() => {
            navigate("/signup");
            openModalHandler();
          }}
        >
          회원가입
        </Button>
        {/* <Link
          to="/signup"
          onClick={openModalHandler}
          // onKeyPress={openModalHandler}
        >
          OnWedding 회원가입
        </Link> */}
      </ModalContainer>
    </>
  );
};

export default LoginModal;
