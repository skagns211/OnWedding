import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

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
    border-radius: 70%;
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

const MyPage = ({ userInfo, setImg, img, setUserInfo }) => {
  //! s3 ??????
  const AWS = require("aws-sdk");

  AWS.config.update({
    region: "ap-northeast-2", // ????????? ???????????? ????????? ???????????? ????????????. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:553da489-28ff-4eb6-b0ba-1187a7a08c29", // cognito ?????? ????????? ????????? ?????? ???????????? ????????????. (Ex. "ap-northeast-2...")
    }),
  });

  const [profile, setProfile] = useState(null);

  const handleImg = (event) => {
    const imgFile = event.target.files[0];
    if (!imgFile) {
      return setProfile(null);
    }
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "onwedding-img", // ???????????? ?????? ????????? ???????????? ??????.
        Key: imgFile.name, //???????????? ?????????
        Body: imgFile, // ???????????? ?????? ??????
      },
    });

    const promise = upload.promise();

    promise.then(
      (data) => {
        setProfile(data.Location);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  //! s3 ??????\

  // axios.patch(
  //   "https://localhost:4000/user/profile",
  //   {
  //     image: profile,
  //   },
  //   {
  //     withCredentials: true,
  //   }
  // );

  // setUserInfo({...userInfo, image: res.data.data.img});

  return (
    <StyledBody>
      <MypageHeader>{`${userInfo.name}'s Page`}</MypageHeader>
      <ElementContainer>
        <SpanLeft>
          {img ? (
            <img src={img} alt="??????" />
          ) : (
            <img
              src={"https://onweddingimg.s3.amazonaws.com/default.png"}
              alt="??????"
            />
          )}
          {/* <div>
            <input type="file" onChange={handleImg} alt="??????" />
          </div> */}
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
            <Button>???????????? ??????</Button>
            <Button>????????????</Button>
          </ElementBox>
        </SpanRight>
      </ElementContainer>
    </StyledBody>
  );
};

export default MyPage;
