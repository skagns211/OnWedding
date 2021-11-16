import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import dummy from "../dummy/dummy";

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

const MyPage = () => {
  return (
    <StyledBody>
      <img src={dummy[0].img} />
      <div>
        <span>Name</span>
        <span>{dummy[0].name}</span>
      </div>
      <div>
        <span>Nick</span>
        <span>{dummy[0].nickname}</span>
      </div>
      <div>
        <span>Email</span>
        <span>{dummy[0].email}</span>
      </div>
      <div>
        <span>Name</span>
        <span>{dummy[0].name}</span>
      </div>
      <Link to="/change">비밀번호 변경</Link>
      <Link to="/delete">회원 탈퇴</Link>
    </StyledBody>
  );
};

export default MyPage;
