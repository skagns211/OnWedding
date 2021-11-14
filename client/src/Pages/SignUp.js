import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

axios.default.withCredentials = true;

const SignUp = () => {
  const [userinfo, setUserinfo] = useState({
    email: "",
    username: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    birth: "",
    mobile: "",
  });

  //! 메세지 State
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");
  const [mobileMessage, setMobileMessage] = useState("");

  //! 유효성검사 및 State
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPwdCheck, setIsPwdCheck] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isBtn, setIsBtn] = useState(false);

  const handleInputValue = (key) => (e) => {
    setUserinfo({ ...userinfo, [key]: e.target.value });
  };

  const validEmail = (email) => {
    const regEmail =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (regEmail.test(email) === false) {
      setIsEmail(false);
      setEmailMessage("올바른 이메일 형식이 아닙니다.");
    } else {
      setIsEmail(true);
      setEmailMessage("올바른 이메일 형식입니다:)");
    }
  };

  const validPassword = (password) => {
    const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!regPassword.test(password)) {
      setIsPassword(false);
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
    } else {
      setIsPassword(true);
      setPasswordMessage("사용하기 좋은 비밀번호입니다:)");
    }
  };

  const checkPassword = (password, cheeckPassword) => {
    if (password === cheeckPassword) {
      setIsPwdCheck(true);
      setPasswordCheckMessage("비밀번호가 일치합니다:)");
    } else {
      setIsPwdCheck(false);
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
    }
  };

  const validMobile = (mobile) => {
    mobile = mobile.split("-").join("");
    const regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
    if (!regPhone.test(mobile)) {
      setIsMobile(false);
      setMobileMessage("번호형식이 유효하지 않습니다.");
    } else {
      setIsMobile(true);
      setMobileMessage("올바른 번호입니다:)");
    }
  };

  const hideBtn = () => {
    const {
      email,
      username,
      nickname,
      password,
      passwordCheck,
      birth,
      mobile,
    } = userinfo;
    if (
      (email, username, nickname, password, passwordCheck, birth, mobile !== "")
      // (isEmail, isPassword, isPwdCheck, isMobile === true)
    ) {
      if ((isEmail, isPassword, isPwdCheck, isMobile === true)) {
        setIsBtn(true);
      } else {
        setIsBtn(false);
      }
      // setIsBtn(true);
    } else {
      setIsBtn(false);
    }
  };
  const btn1 = () => {
    console.log("haha");
  };

  // const twoFunc = () => {
  //   handleInputValue("email");
  //   () => {
  //     hideBtn();
  //   };
  // };

  return (
    <div>
      <center>
        <div></div>
        <div>Welcome to OnWedding!</div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={handleInputValue("email")}
              onBlur={() => {
                validEmail(userinfo.email);
                hideBtn();
              }}
            />
            {isEmail ? (
              <div>{emailMessage}</div>
            ) : userinfo.email.length === 0 ? null : (
              <div>{emailMessage}</div>
            )}
          </div>
          <div>
            <input
              type="username"
              placeholder="Name"
              onChange={handleInputValue("username")}
              onBlur={() => hideBtn()}
            />
          </div>
          <div>
            <input
              type="nickname"
              placeholder="Nickname"
              onChange={handleInputValue("nickname")}
              onBlur={() => {
                hideBtn();
              }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={handleInputValue("password")}
              onBlur={() => {
                validPassword(userinfo.password);
                hideBtn();
              }}
            />
            {isPassword ? (
              <div>{passwordMessage}</div>
            ) : userinfo.password.length === 0 ? null : (
              <div>{passwordMessage}</div>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="PasswordCheck"
              onChange={handleInputValue("passwordCheck")}
              onBlur={() => {
                checkPassword(userinfo.password, userinfo.passwordCheck);
                hideBtn();
              }}
            />
            {isPwdCheck ? (
              userinfo.passwordCheck.length === 0 ? null : (
                <div>{passwordCheckMessage}</div>
              )
            ) : userinfo.passwordCheck.length === 0 ? null : (
              <div>{passwordCheckMessage}</div>
            )}
          </div>
          <div>
            <input
              type="birth"
              placeholder="Birth"
              onChange={handleInputValue("birth")}
              onBlur={() => hideBtn()}
            />
          </div>
          <div>
            <input
              type="mobile"
              placeholder="Mobile"
              onChange={handleInputValue("mobile")}
              onBlur={() => {
                validMobile(userinfo.mobile);
                hideBtn();
              }}
            />
            {isMobile ? (
              <div>{mobileMessage}</div>
            ) : userinfo.mobile.length === 0 ? null : (
              <div>{mobileMessage}</div>
            )}
          </div>
          <div>
            <button
              className="btn btn-signup"
              type="submit"
              disabled={isBtn ? false : "disabled"}
              onClick={() => {
                btn1();
                //! axios post/signup
              }}
            >
              회원가입
            </button>
          </div>
        </form>
      </center>
    </div>
  );
};

export default SignUp;