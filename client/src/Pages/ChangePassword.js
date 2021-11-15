import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const [passwordInfo, setPasswordInfo] = useState({
    // currentPassword: "",
    newPassword: "",
    checkNewPassword: "",
  });
  //! 입력상태 state
  // const [isPassword, setIsPassword] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isCheckNewpassword, setIsCheckNewPassword] = useState(false);

  // const [curPasswordMsg, setCurPasswordMsg] = useState(""); //! 현재 패스워드가 안맞을경우 메세지를 위한 state
  const [passwordMessage, setPasswordMessage] = useState(""); //! 새로운 패스워드 유효성검사 메세지 state
  const [passwordCheckMessage, setPasswordCheckMessage] = useState(""); //! 새로운 패스워드 확인 메세지 state

  const handleInputValue = (key) => (e) => {
    setPasswordInfo({ ...passwordInfo, [key]: e.target.value });
  };

  // //! 현재 비밀번호 상태 변경
  // const curPasswordState = () => {
  //   if (passwordInfo.currentPassword.length !== 0) {
  //     setIsPassword(true);
  //     setCurPasswordMsg("");
  //   } else {
  //     setIsPassword(false);
  //     setCurPasswordMsg("현재 비밀번호를 입력해주세요.");
  //   }
  // };

  //! newPassword 유효성검사
  const validPassword = (newPassword) => {
    const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!regPassword.test(newPassword)) {
      setIsNewPassword(false);
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
    } else {
      setIsNewPassword(true);
      setPasswordMessage("");
    }
  };

  //! newPassword 확인 유효성검사
  const checkPassword = (password, checkPassword) => {
    if (password === checkPassword) {
      setIsCheckNewPassword(true);
      setPasswordCheckMessage("");
    } else {
      setIsCheckNewPassword(false);
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
    }
  };

  const infoAll = () => {
    const stateInfo = {
      // password: [passwordInfo.currentPassword, isPassword],
      newPassword: [passwordInfo.newPassword, isNewPassword],
      checkState: isCheckNewpassword,
    };
    if (isNewPassword && isCheckNewpassword === true) {
      console.log("로그인 요청이 성공적으로 전달되었습니다.");
    } else {
      console.log("로그 요청이 실패하였습니다.");
    }
    console.log(stateInfo);
  };

  return (
    <div>
      <center>
        <div>비밀번호 변경</div>
        {/* <div>
          <input
            type="password"
            placeholder="현재 비밀번호"
            onChange={handleInputValue("currentPassword")}
            onBlur={() => {
              curPasswordState();
            }}
          />
          {isPassword ? null : <div>{curPasswordMsg}</div>}
        </div> */}
        <div>
          <input
            type="password"
            placeholder="새로운 비밀번호"
            onChange={handleInputValue("newPassword")}
            onBlur={() => {
              validPassword(passwordInfo.newPassword);
            }}
          />
          {isNewPassword ? (
            passwordInfo.newPassword.length === 0 ? null : (
              <div>{passwordMessage}</div>
            )
          ) : passwordInfo.newPassword.length === 0 ? null : (
            <div>{passwordMessage}</div>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="새로운 비밀번호 확인"
            onChange={handleInputValue("checkNewPassword")}
            onBlur={() => {
              checkPassword(
                passwordInfo.newPassword,
                passwordInfo.checkNewPassword
              );
            }}
          />
          {isCheckNewpassword ? (
            passwordInfo.checkNewPassword.length === 0 ? null : (
              <div>{passwordCheckMessage}</div>
            )
          ) : (
            <div>{passwordCheckMessage}</div>
          )}
        </div>
        <button type="submit" className="postChangePassword" onClick={infoAll}>
          비밀번호 변경
        </button>
      </center>
    </div>
  );
};

export default ChangePassword;
