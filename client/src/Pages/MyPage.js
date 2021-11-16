import React from "react";
import styled from "styled-components";
import dummy from "../dummy/dummy";
import { Link } from "react-router-dom";

const StyledBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  max-width: 75%;
  height: 75vh;
  margin: 0 auto;
  > img {
    border-radius: 50%;
    width: 25rem;
    height: 25rem;
  }
  > span {
    margin: 2rem;
  }
`;

const MyPage = ({ userInfo }) => {
  return (
    <StyledBody>
      <img src={dummy[0].img} />
      <right>
        <div>
          <span>Name: </span>
          <span>{userInfo.name}</span>
        </div>
        <div>
          <span>Nick: </span>
          <span>{userInfo.nickname}</span>
        </div>
        <div>
          <span>Email: </span>
          <span>{userInfo.email}</span>
        </div>
        <div>
          <span>Mobile: </span>
          <span>{userInfo.mobile}</span>
        </div>
        <div>
          <Link to="/change">비밀번호 변경</Link>
        </div>
        <div>
          <Link to="/delete">회원 탈퇴</Link>
        </div>
      </right>
    </StyledBody>
  );
};

export default MyPage;
