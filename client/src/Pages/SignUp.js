import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const SignUpContainer = styled.div`
  background-color: #f4eae0;
  padding: 2rem;
  /* z-index: 1011; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media only screen and (max-width: 534px) {
    background-color: #f4eae0;
    padding: 0.5rem;
    /* z-index: 1011; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  &.CompleteSignUp {
    width: 100vw;
    height: 72vh;
  }
`;

const WelcomeHeader = styled.div`
  font-size: 2.7rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  @media only screen and (max-width: 540px) {
    font-size: 2.2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
  }
  &.DeleteComplete {
    font-size: 2.7rem;
    margin: auto;
  }
`;
const WelcomeMessage = styled.div`
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
  @media only screen and (max-width: 534px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
  }
`;

const Line = styled.div`
  width: 33rem;
  height: 1px;
  padding: 0;
  margin-bottom: 0.5rem;
  align-items: center;
  background: #cecece;
  @media only screen and (max-width: 534px) {
    width: 22rem;
    height: 1px;
    padding: 0;
    margin-bottom: 0.5rem;
    align-items: center;
    background: #cecece;
  }
`;

const ElemetContainer = styled.div`
  background-color: #f4eae0;
  padding: 0.5rem;
  /* z-index: 1011; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ElementBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media only screen and (max-width: 534px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid black; */
  }
`;

const Element = styled.div`
  font-size: 1rem;
  padding-top: 0.6rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;

  /* font-family: "MaplestoryOTFLight"; */
  /* font-family: "NanumGimYuICe"; */
  @media only screen and (max-width: 534px) {
    width: 20rem;
    margin: auto;
    font-size: 0.9rem;
    padding-top: 0.3rem;
    margin-top: 0.4rem;
    /* border: 1px solid black; */
  }
`;

const InputBox = styled.input`
  width: 24rem;
  height: 2.5rem;
  margin-top: 0.2rem;
  border-radius: 0.4rem;
  border: none;
  background-color: white;
  font-size: 1rem;
  text-align: center;
  ::-webkit-input-placeholder {
    text-align: center;
  }
  &.Email {
    width: 17rem;
    border-radius: 0.4rem;
    @media only screen and (max-width: 534px) {
      width: 14rem;
      height: 2rem;
      margin-top: 0.1rem;
      border-radius: 0.4rem;
      border: none;
      background-color: white;
      font-size: 0.9rem;
    }
  }
  &.Nickname {
    width: 17rem;
    border-radius: 0.4rem;
    @media only screen and (max-width: 534px) {
      width: 14rem;
      height: 2rem;
      margin-top: 0.1rem;
      border-radius: 0.4rem;
      border: none;
      background-color: white;
      font-size: 0.9rem;
    }
  }
  /* font-family: "NanumGimYuICe"; */
  @media only screen and (max-width: 534px) {
    width: 20rem;
    height: 2rem;
    margin-top: 0.1rem;
    border-radius: 0.4rem;
    border: none;
    background-color: white;
    font-size: 0.9rem;
  }
`;

const Elementmessage = styled.div`
  color: red;
  font-size: 0.7rem;
  margin-top: 0.4rem;
  @media only screen and (max-width: 534px) {
    font-size: 0.4rem;
    margin-top: 0.2rem;
  }
  &.good {
    color: #3d76e9;
  }
`;

const Button = styled.button`
  top: 1rem;
  position: relative;
  width: 7rem;
  height: 2.62rem;
  border: none;
  border-radius: 0.4rem;
  margin-left: 0.2rem;
  background-color: #817c8d;
  font-family: "paybooc-Medium";
  font-size: 0.7rem;
  color: #ffffff;
  :hover {
    color: rgba(255, 255, 255, 0.85);
    box-shadow: rgba(30, 22, 54, 0.7) 0 5rem 0rem 2rem inset;
  }

  &.signup {
    @media only screen and (max-width: 534px) {
      width: 6rem;
      height: 3rem;
      margin-top: 2rem;
      font-size: 0.9rem;
      display: block;
      position: relative;
      margin: auto;
    }
    width: 10rem;
    height: 4rem;
    margin-top: 2rem;
    font-size: 1.1rem;
    display: block;
    position: relative;
    margin: auto;
  }

  &.Emailbtn {
    top: -0.1rem;
    @media only screen and (max-width: 534px) {
      top: -0.15rem;
      position: relative;
      width: 5.5rem;
      height: 2.1rem;
      border: none;
      border-radius: 0.4rem;
      margin-left: 0.2rem;
      background-color: #817c8d;
      font-family: "paybooc-Medium";
      font-size: 0.6rem;
      color: #ffffff;
    }
  }
  &.NicknameBtn {
    top: -0.1rem;
    @media only screen and (max-width: 534px) {
      top: -0.15rem;
      position: relative;
      width: 5.5rem;
      height: 2.1rem;
      border: none;
      border-radius: 0.4rem;
      margin-left: 0.2rem;
      background-color: #817c8d;
      font-family: "paybooc-Medium";
      font-size: 0.6rem;
      color: #ffffff;
    }
  }
`;

//!--------------------------------------------------------------------

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

  //! ????????? State
  const [emailMessage, setEmailMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");
  const [mobileMessage, setMobileMessage] = useState("");

  //! ??????????????? ??? State
  const [isEmail, setIsEmail] = useState(false);
  const [isDupEmail, setIsDupEmail] = useState(false); //! ????????? ????????? ???????????? State
  const [isUsername, setIsUsername] = useState(false);
  const [isDupNickname, setIsDupNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPwdCheck, setIsPwdCheck] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  //! ???????????? ?????? state
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  const handleComplete = () => {
    axios
      .post(
        "/auth/signup",
        {
          email: userinfo.email,
          password: userinfo.password,
          name: userinfo.username,
          nickname: userinfo.nickname,
          birth: userinfo.birth,
          mobile: userinfo.mobile,
        },
        { httpOnly: true, withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        const successMsg = res.data.message;
        if (successMsg) {
          setIsComplete(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => {
        throw err;
      });

    // //! ????????? ???????????????????????? ?????? ??????
    // setIsComplete(true);
    // setTimeout(() => {
    //   history("/");
    // }, 2000);
  };

  const handleInputValue = (key) => (e) => {
    setUserinfo({ ...userinfo, [key]: e.target.value });
  };

  //! email ?????? ???????????????
  const validEmail = (email) => {
    const regEmail =
      /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (regEmail.test(email) === false) {
      setIsEmail(false);
      setEmailMessage("????????? ????????? ????????? ????????????.");
    } else {
      setIsEmail(true);
      setEmailMessage("????????? ????????? ???????????????. ?????? ?????? ???????????? :)");
    }
  };
  //! password ???????????????
  const validPassword = (password) => {
    const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!regPassword.test(password)) {
      setIsPassword(false);
      setPasswordMessage(
        "??????+?????????+???????????? ???????????? 8?????? ?????? ??????????????????!"
      );
    } else {
      setIsPassword(true);
      setPasswordMessage("???????????? ?????? ?????????????????????:)");
    }
  };
  //! password ?????? ???????????????
  const checkPassword = (password, cheeckPassword) => {
    if (password === cheeckPassword) {
      setIsPwdCheck(true);
      setPasswordCheckMessage("??????????????? ???????????????:)");
    } else {
      setIsPwdCheck(false);
      setPasswordCheckMessage("??????????????? ???????????? ????????????.");
    }
  };

  //! ???????????? ???????????????
  const checkBirth = (birth) => {
    const regBirth =
      /^([0-9][0-9][0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const birthYear = birth.toString().substring(0, 4);
    if (!regBirth.test(birth)) {
      setBirthMessage("??????????????? ?????? ?????????????????? ex) 20180917");
      setIsBirth(false);
    } else {
      if (nowYear - birthYear >= 100) {
        setBirthMessage("???????????? ?????? ???????????? ????????? ???????????????");
        setIsBirth(false);
      } else if (nowYear - birthYear < 0) {
        setBirthMessage("????????????????????? ???????");
        setIsBirth(false);
      } else {
        setBirthMessage("????????? ?????????????????????.");
        setIsBirth(true);
      }
    }
  };

  //! mobile?????? ???????????????
  const validMobile = (mobile) => {
    mobile = mobile.split("-").join("");
    const regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
    if (!regPhone.test(mobile)) {
      setIsMobile(false);
      setMobileMessage("??????????????? ???????????? ????????????.");
    } else {
      setIsMobile(true);
      setMobileMessage("????????? ???????????????:)");
    }
  };

  //! email ?????? ??????
  const dupEmail = (email) => {
    axios
      .post(
        "/auth/email",
        { email: userinfo.email },
        { httpOnly: true, withCredentials: true }
      )
      .then((res) => {
        const resMsg = res.data.message;
        if (resMsg === "email overlap") {
          setIsDupEmail(false);
          setEmailMessage("?????? ??????????????? ??????????????????.");
        } else if (resMsg === "ok") {
          setIsDupEmail(true);
          setEmailMessage("??????????????? ??????????????????.");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  //! nickName ?????? ??????
  const dupNickname = (nickname) => {
    axios
      .post(
        "/auth/nickname",
        { nickname: userinfo.nickname },
        { httpOnly: true, withCredentials: true }
      )
      .then((res) => {
        const resMsg = res.data.message;
        if (resMsg === "nickname overlap") {
          setIsDupNickname(false);
          setNicknameMessage("?????? ???????????? ??????????????????.");
        } else if (resMsg === "ok") {
          setIsDupNickname(true);
          setNicknameMessage("??????????????? ??????????????????:)");
        }
      });
  };

  //! ?????? ????????????
  const nameState = () => {
    if (userinfo.username !== "") {
      setIsUsername(true);
    } else {
      setIsUsername(false);
    }
  };

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
      handleComplete();
      console.log("???????????? ????????? ??????????????? ?????????????????????.");
    } else {
      console.log("???????????? ????????? ?????????????????????.");
    }
    console.log(stateInfo);
  };

  return isComplete ? (
    <SignUpContainer className="CompleteSignUp">
      <WelcomeHeader className="DeleteComplete">
        ??????????????? ?????????????????????.
      </WelcomeHeader>
    </SignUpContainer>
  ) : (
    <SignUpContainer>
      {/* <center> */}
      <WelcomeHeader>Welcome to OnWedding!</WelcomeHeader>
      <WelcomeMessage>
        ???????????? ????????? ??? ?????? ???????????? ????????? ??? ????????????.
      </WelcomeMessage>
      <Line />
      <ElemetContainer>
        <form onSubmit={(e) => e.preventDefault()}>
          <ElementBox>
            <div>
              <Element>?????????</Element>
              <InputBox
                className="Email"
                type="email"
                placeholder="Email"
                onChange={handleInputValue("email")}
                onBlur={() => {
                  validEmail(userinfo.email);
                  // hideBtn();
                }}
              />
              <Button
                className="Emailbtn"
                type="submit"
                disabled={isEmail ? false : "disabled"}
                onClick={() => {
                  dupEmail(userinfo.email);
                }}
              >
                ????????? ?????? ??????
              </Button>
              {isEmail ? (
                <Elementmessage className="good">{emailMessage}</Elementmessage>
              ) : userinfo.email.length === 0 ? null : (
                <Elementmessage>{emailMessage}</Elementmessage>
              )}
            </div>
          </ElementBox>
          <ElementBox>
            <div>
              <Element>??????</Element>
              <InputBox
                type="username"
                placeholder="Name"
                onChange={handleInputValue("username")}
                onBlur={
                  () => nameState()
                  // () => hideBtn()
                }
              />
            </div>
          </ElementBox>
          <ElementBox>
            <div>
              <Element>?????????</Element>
              <InputBox
                className="Nickname"
                type="nickname"
                placeholder="Nickname"
                onChange={handleInputValue("nickname")}
                onBlur={() => {
                  // hideBtn();
                }}
              />
              <Button
                className="NicknameBtn"
                type="submit"
                disabled={userinfo.nickname.length !== 0 ? false : "disabled"}
                onClick={() => {
                  dupNickname(userinfo.nickname);
                }}
              >
                ????????? ?????? ??????
              </Button>
              {isDupNickname ? (
                <Elementmessage className="good">
                  {nicknameMessage}
                </Elementmessage>
              ) : userinfo.nickname.length === 0 ? null : (
                <Elementmessage>{nicknameMessage}</Elementmessage>
              )}
            </div>
          </ElementBox>
          {/* <button
          className="btnNicknameCheck"
          type="submit"
          disabled={userinfo.nickname.length !== 0 ? false : "disabled"}
          onClick={() => {
            dupNickname(userinfo.nickname);
          }}
        >
          ????????? ?????? ??????
        </button> */}
          <div>
            <Element>????????????</Element>
            <InputBox
              type="password"
              placeholder="Password"
              onChange={handleInputValue("password")}
              onBlur={() => {
                validPassword(userinfo.password);
                // hideBtn();
              }}
            />
            {isPassword ? (
              <Elementmessage className="good">
                {passwordMessage}
              </Elementmessage>
            ) : userinfo.password.length === 0 ? null : (
              <Elementmessage>{passwordMessage}</Elementmessage>
            )}
          </div>
          <div>
            <Element>???????????? ??????</Element>
            <InputBox
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
                <Elementmessage className="good">
                  {passwordCheckMessage}
                </Elementmessage>
              )
            ) : userinfo.passwordCheck.length === 0 ? null : (
              <Elementmessage>{passwordCheckMessage}</Elementmessage>
            )}
          </div>
          <div>
            <Element>??????</Element>
            <InputBox
              type="birth"
              placeholder="Birth ex) 19880624"
              onChange={handleInputValue("birth")}
              onBlur={
                // () => hideBtn()
                () => checkBirth(userinfo.birth)
              }
            />
            {isBirth ? (
              <Elementmessage className="good">{birthMessage}</Elementmessage>
            ) : userinfo.birth.length === 0 ? null : (
              <Elementmessage>{birthMessage}</Elementmessage>
            )}
          </div>
          <div>
            <Element>????????????</Element>
            <InputBox
              type="mobile"
              placeholder="Mobile ex) 01012345678"
              onChange={handleInputValue("mobile")}
              onBlur={() => {
                validMobile(userinfo.mobile);
                // hideBtn();
              }}
            />
            {isMobile ? (
              <Elementmessage className="good">{mobileMessage}</Elementmessage>
            ) : userinfo.mobile.length === 0 ? null : (
              <Elementmessage>{mobileMessage}</Elementmessage>
            )}
          </div>
          <div>
            <Button
              className="signup"
              type="submit"
              // disabled={isBtn ? false : "disabled"}
              onClick={
                infoAll
                //! axios post/signup
              }
            >
              ????????????
            </Button>
          </div>
        </form>
      </ElemetContainer>
      {/* </center> */}
    </SignUpContainer>
  );
};

export default SignUp;
