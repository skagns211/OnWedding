import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import dummy from "../dummy/dummy";

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #f4eae0;
  max-width: 60%;
  height: 75vh;
  margin: 0 auto;
  border: 1px solid #b2b2b2;
  border-radius: 0.4rem;
  > span {
    margin: 2rem;
  }
`;
const MypageHeader = styled.div`
  width: 100%;
  font-size: 2.7rem;
  margin-top: 1rem;
  display: block;
  text-align: center;
  /* border: 1px solid black; */
`;
const ElementContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  /* border: 1px solid black; */
`;

const SpanLeft = styled.div`
  width: 50%;
  height: 30rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  /* border: 2px solid black; */
  flex-direction: column;
  text-align: right;
  > img {
    margin-top: 3rem;
    margin-bottom: 1rem;
    border-radius: 50%;
    width: 20rem;
    height: 20rem;
    border: 1px solid #b2b2b2;
  }
`;
const SpanRight = styled.div`
  width: 50%;
  height: 30rem;
  text-align: left;
  display: relative;
  justify-content: flex-start;
  align-items: flex-center;
  /* border: 2px solid black; */
  > div {
    flex-direction: column;
    display: block;
  }
`;
const ElementBox = styled.div`
  margin-top: 4rem;
  width: 30vw;
  height: 50vh;
  margin-left: 1rem;
  /* border: 1px solid black; */
  span {
    width: 7rem;
    height: 2rem;
    display: inline-block;
    margin-top: 1.2rem;
    font-size: 1.2rem;
    /* border: 1px solid black; */
  }
`;

const Button = styled.button`
  top: 1rem;
  position: relative;
  width: 10rem;
  height: 2.62rem;
  border: none;
  border-radius: 0.4rem;
  margin-left: 0.2rem;
  background-color: #817c8d;
  font-family: "paybooc-Medium";
  font-size: 0.8rem;
  color: #ffffff;
  :hover {
    color: rgba(255, 255, 255, 0.85);
    box-shadow: rgba(30, 22, 54, 0.7) 0 5rem 0rem 2rem inset;
  }
`;

const MyPage = ({ userInfo }) => {
  return (
    <StyledBody>
      <MypageHeader>{`${userInfo.name}'s Page`}</MypageHeader>
      <ElementContainer>
        <SpanLeft>
          <img src={dummy[0].img} />
          <div>
            <input type="file" />
          </div>
        </SpanLeft>
        <SpanRight>
          <ElementBox>
            <div></div>
            <span>Name: </span>
            <span>{userInfo.name}</span>
            <div></div>
            <span>NickName: </span>
            <span>{userInfo.nickname}</span>
            <div></div>
            <span>Email: </span>
            <span>{userInfo.email}</span>
            <div></div>
            <span>Mobile: </span>
            <span>{userInfo.mobile}</span>
            <div></div>
            <Button>비밀번호 변경</Button>
            <Button>회원탈퇴</Button>
          </ElementBox>
        </SpanRight>
      </ElementContainer>
    </StyledBody>
  );
};

export default MyPage;
