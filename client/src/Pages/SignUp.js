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
  const [validEmail, setValidEmail] = useState(false);

  const handleInputValue = (key) => (e) => {
    setUserinfo({ ...userinfo, [key]: e.target.value });
    console.log(validEmail);
  };

  const checkEmail = (email) => {
    const regEmail =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (regEmail.test(email) === false) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
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
              onblur={() => checkEmail(userinfo.email)}
            />
            {validEmail ? (
              <div>haha</div>
            ) : (
              <div>올바른 이메일 형식이 아닙니다.</div>
            )}
          </div>
          <div>
            <input
              type="username"
              placeholder="Name"
              onChange={handleInputValue("username")}
            />
          </div>
          <div>
            <input
              type="nickname"
              placeholder="Nickname"
              onChange={handleInputValue("nickname")}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={handleInputValue("password")}
            />
          </div>
          <div>
            <input
              type="passwordCheck"
              placeholder="PasswordCheck"
              onChange={handleInputValue("passwordCheck")}
            />
          </div>
          <div>
            <input
              type="birth"
              placeholder="Birth"
              onChange={handleInputValue("birth")}
            />
          </div>
          <div>
            <input
              type="mobile"
              placeholder="Mobile"
              onChange={handleInputValue("mobile")}
            />
          </div>
          <div>
            <button className="btn btn-signup" type="submit">
              회원가입
            </button>
          </div>
        </form>
      </center>
    </div>
  );
};

export default SignUp;
