import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

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

const MyPage = ({ userInfo, setUserInfo }) => {
  //! s3 구현
  const AWS = require("aws-sdk");

  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력하기. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:553da489-28ff-4eb6-b0ba-1187a7a08c29", // cognito 인증 풀에서 받아온 키를 문자열로 입력하기. (Ex. "ap-northeast-2...")
    }),
  });

  const [profile, setProfile] = useState(null);

  const handleImg = event => {
    const imgFile = event.target.files[0];
    if (!imgFile) {
      return setProfile(null);
    }
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "onwedding-img", // 업로드할 대상 버킷명 문자열로 작성.
        Key: imgFile.name, //업로드할 파일명
        Body: imgFile, // 업로드할 파일 객체
      },
    });

    const promise = upload.promise();

    promise.then(
      data => {
        setProfile(data.Location);
      },
      err => {
        console.log(err);
      }
    );
  };
  //! s3 구현\

  if (profile) {
    axios
      .patch(
        "https://localhost:4000/user/profile",
        {
          image: profile,
        },
        {
          withCredentials: true,
        }
      )
      .then(res => {
        setUserInfo({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          nickname: userInfo.nickname,
          mobile: userInfo.mobile,
          image: res.data.data.img,
        });
      });
  }
  console.log(userInfo.image);

  return (
    <StyledBody>
      {userInfo.image && userInfo.image === /^A/ ? (
        <img src={userInfo.image} />
      ) : (
        <img
          src={
            "https://onwedding-img.s3.ap-northeast-2.amazonaws.com/default-placeholder-1024x1024.png"
          }
        />
      )}

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
        <input type="file" onChange={handleImg} />
      </right>
    </StyledBody>
  );
};

export default MyPage;
