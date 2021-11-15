import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import users from "../dummy/Users";

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
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");
  const [mobileMessage, setMobileMessage] = useState("");

  //! 유효성검사 및 State
  const [isEmail, setIsEmail] = useState(false);
  const [isDupEmail, setIsDupEmail] = useState(false); //! 이메일 중복을 확인하는 State
  const [isUsername, setIsUsername] = useState(false);
  const [isDupNickname, setIsDupNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPwdCheck, setIsPwdCheck] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const [isBtn, setIsBtn] = useState(false);

  const handleInputValue = (key) => (e) => {
    setUserinfo({ ...userinfo, [key]: e.target.value });
  };

  //! email 형식 유효성검사
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
  //! password 유효성검사
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
  //! password 확인 유효성검사
  const checkPassword = (password, cheeckPassword) => {
    if (password === cheeckPassword) {
      setIsPwdCheck(true);
      setPasswordCheckMessage("비밀번호가 일치합니다:)");
    } else {
      setIsPwdCheck(false);
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
    }
  };

  //! 생년월일 유효성검사
  const checkBirth = (birth) => {
    const regBirth =
      /^([0-9][0-9][0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const birthYear = birth.toString().substring(0, 4);
    if (!regBirth.test(birth)) {
      setBirthMessage("생년월일을 다시 입력해주세요 ex) 20180917");
      setIsBirth(false);
    } else {
      if (nowYear - birthYear >= 100) {
        setBirthMessage("타임머신 타고 오신분은 가입이 안돼요ㅠㅠ");
        setIsBirth(false);
      } else if (nowYear - birthYear < 0) {
        setBirthMessage("태어나셨습니까 휴먼?");
        setIsBirth(false);
      } else {
        setBirthMessage("올바른 생년월일입니다.");
        setIsBirth(true);
      }
    }
  };

  //! mobile형식 유효성검사
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

  //! email 중복 체크
  const dupEmail = (email) => {
    const check = users.filter((user) => {
      return user.email === email;
    });
    if (check.length !== 0) {
      setIsDupEmail(false);
      setEmailMessage("이미 회원가입된 이메일입니다.");
    } else {
      setIsDupEmail(true);
      setEmailMessage("사용가능한 이메일입니다:)");
    }
  };

  //! nickName 중복 체크
  const dupNickname = (nickname) => {
    const check = users.filter((user) => {
      return user.nickname === nickname;
    });
    if (check.length !== 0) {
      setIsDupNickname(false);
      setNicknameMessage("이미 사용중인 닉네임입니다.");
    } else {
      setIsDupNickname(true);
      setNicknameMessage("사용가능한 닉네임입니다:)");
    }
  };

  //! 이름 상태변경
  const nameState = () => {
    if (userinfo.username !== "") {
      setIsUsername(true);
    } else {
      setIsUsername(false);
    }
  };

  // //! Button hide function
  // const hideBtn = () => {
  //   const {
  //     email,
  //     username,
  //     nickname,
  //     password,
  //     passwordCheck,
  //     birth,
  //     mobile,
  //   } = userinfo;

  //   if (
  //     (email, username, nickname, password, passwordCheck, birth, mobile !== "")
  //     // (isEmail, isPassword, isPwdCheck, isMobile === true)
  //   ) {
  //     if (
  //       (isEmail,
  //       isPassword,
  //       isPwdCheck,
  //       isMobile,
  //       isDupEmail,
  //       isDupNickname === true)
  //     ) {
  //       setIsBtn(true);
  //     } else {
  //       setIsBtn(false);
  //     }
  //     // setIsBtn(true);
  //   } else {
  //     setIsBtn(false);
  //   }
  //   console.log(email);
  // };

  const infoAll = () => {
    const {
      email,
      username,
      nickname,
      password,
      passwordCheck,
      birth,
      mobile,
    } = userinfo;
    const stateInfo = [
      { email, username, nickname, password, passwordCheck, birth, mobile },
      {
        isEmail,
        isDupEmail,
        isUsername,
        isDupNickname,
        isPassword,
        isPwdCheck,
        isBirth,
        isMobile,
      },
    ];
    if (
      isEmail &&
      isDupEmail &&
      isUsername &&
      isDupNickname &&
      isPassword &&
      isPwdCheck &&
      isBirth &&
      isMobile === true
    ) {
      console.log("회원가입 요청이 성공적으로 전달되었습니다.");
    } else {
      console.log("회원가입 요청이 실패하였습니다.");
    }
    console.log(stateInfo);
  };

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
                // hideBtn();
              }}
            />
            {isEmail ? (
              <div>{emailMessage}</div>
            ) : userinfo.email.length === 0 ? null : (
              <div>{emailMessage}</div>
            )}
          </div>
          <button
            className="btnEmailCheck"
            type="submit"
            disabled={isEmail ? false : "disabled"}
            onClick={() => {
              dupEmail(userinfo.email);
            }}
          >
            이메일 중복 확인
          </button>
          <div>
            <input
              type="username"
              placeholder="Name"
              onChange={handleInputValue("username")}
              onBlur={
                () => nameState()
                // () => hideBtn()
              }
            />
          </div>
          <div>
            <input
              type="nickname"
              placeholder="Nickname"
              onChange={handleInputValue("nickname")}
              onBlur={() => {
                // hideBtn();
              }}
            />
            {isDupNickname ? (
              <div>{nicknameMessage}</div>
            ) : userinfo.nickname.length === 0 ? null : (
              <div>{nicknameMessage}</div>
            )}
          </div>
          <button
            className="btnEmailCheck"
            type="submit"
            disabled={userinfo.nickname.length !== 0 ? false : "disabled"}
            onClick={() => {
              dupNickname(userinfo.nickname);
            }}
          >
            닉네임 중복 확인
          </button>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={handleInputValue("password")}
              onBlur={() => {
                validPassword(userinfo.password);
                // hideBtn();
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
                // hideBtn();
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
              placeholder="Birth ex) 19880624"
              onChange={handleInputValue("birth")}
              onBlur={
                // () => hideBtn()
                () => checkBirth(userinfo.birth)
              }
            />
            {isBirth ? (
              <div>{birthMessage}</div>
            ) : userinfo.birth.length === 0 ? null : (
              <div>{birthMessage}</div>
            )}
          </div>
          <div>
            <input
              type="mobile"
              placeholder="Mobile ex) 01012345678"
              onChange={handleInputValue("mobile")}
              onBlur={() => {
                validMobile(userinfo.mobile);
                // hideBtn();
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
              // disabled={isBtn ? false : "disabled"}
              onClick={
                infoAll
                //! axios post/signup
              }
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
