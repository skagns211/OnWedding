import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledBody = styled.div`
  max-width: 75%;
  margin: 0 auto;
`;

const StyledImg = styled.div`
  background-image: url("https://i.ibb.co/x5HNV5z/bride-g8bfa369fe-1920.jpg");
  background-position: center;
  background-size: contain auto;
  background-repeat: no-repeat;
  padding: 20rem;
  opacity: 0.8;
`;

const StyledMiddle = styled.div`
  background-color: #f4eae0;
  padding: 2rem;
`;

const StyledContent = styled.div`
  background-color: white;
  padding: 2rem 5rem;
  display: flex;
  flex-direction: column;
  & button {
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    font-size: 1rem;
    min-width: 5rem;
    margin-left: 92.5%;
  }
`;

const StyledArea1 = styled.input`
  margin: 2rem;
  font-size: 20px;
  width: 95%;
`;

const StyledArea2 = styled.textarea`
  font-size: 1.5rem;
  margin: 2rem;
  width: 95%;
  height: 50rem;
  resize: none;
`;

const StyledArea3 = styled.input`
  border: none;
  flex: 1;
  height: 2rem;
  font-size: 20px;
  :focus {
    outline: transparent;
  }
`;

const StyledTitle = styled.div`
  font-size: 2rem;
  margin: 2rem 0rem;
`;

const StyledSize = styled.div`
  width: 100%;
`;

const StyleTest = styled.div`
  display: flex;
  justify-content: space-between;
  > img {
    max-width: 20rem;
  }
`;

const TagsInput = styled.div`
  margin: 2rem;
  width: 95%;
  height: 2rem;
  flex-wrap: wrap;
  border: 1px solid rgb(118, 118, 118);
  text-align: left;
  padding: 2rem 0rem;
  display: flex;
  align-items: flex-start;

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;

    > li {
      display: flex;
      align-items: center;
      justify-content: center;
      list-style: none;
      padding: 8px;
      font-size: 1rem;
      border-radius: 10px;
      margin: 0 8px 8px 0;
      background: #f4eae0;
    }
  }
`;

const StyledClose = styled.span`
  margin-left: 0.5rem;
  text-align: center;
  color: black;
  border-radius: 50%;
  padding: 0.1rem;
  background: #fff;
  width: 1rem;
  height: 1rem;
  line-height: 0.7rem;
  border: 1px solid black;
  font-size: 1.5rem;
`;

const Write = ({ edit, userInfo, isModify }) => {
  //! s3 구현
  const AWS = require("aws-sdk");

  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력하기. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:553da489-28ff-4eb6-b0ba-1187a7a08c29", // cognito 인증 풀에서 받아온 키를 문자열로 입력하기. (Ex. "ap-northeast-2...")
    }),
  });

  const [image, setImage] = useState(null);

  const handleImg = event => {
    const imgFile = event.target.files[0];
    if (!imgFile) {
      return setImage(null);
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
        setImage(data.Location);
        console.log(data.Location);
      },
      err => {
        console.log(err);
      }
    );
  };

  //! s3 구현

  const [hashtag, setHashtag] = useState(
    edit.hashtags ? edit.hashtags.map(hashtag => hashtag.name) : []
  );
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [click, setClick] = useState("");

  const removeTags = e => {
    setHashtag(hashtag.filter((_, index) => index !== e));
  };

  const addTags = e => {
    const filtered = hashtag.filter(el => el === e.target.value);
    if (e.target.value !== "" && filtered.length === 0) {
      setHashtag([...hashtag, e.target.value]);
      e.target.value = "";
    }
  };

  const handleHash = () => {
    const filtered = hashtag.filter(el => el === click);
    if (click !== "" && filtered.length === 0) {
      setHashtag([...hashtag, click]);
    }
  };

  const handletitle = e => {
    setTitle(e.target.value);
  };

  const handleMessage = e => {
    setMessage(e.target.value);
  };

  const handleClick = () => {
    axios.post(`http://ec2-3-21-167-88.us-east-2.compute.amazonaws.com/article/${userInfo.id}`, {
      title,
      message,
      image,
      hashtag,
    });
  };

  return (
    <StyledBody>
      <StyledImg />
      <StyledMiddle></StyledMiddle>
      <StyledContent>
        <StyledTitle>{isModify ? "수정하기" : "글쓰기"}</StyledTitle>
        <StyledSize>
          <div>제목</div>
          <StyledArea1
            type="text"
            placeholder="제목을 입력해주세요"
            value={edit ? edit.article.title : null}
            onChange={handletitle}
          />
          <StyleTest>
            내용
            {image ? <img src={image}></img> : null}
            <input type="file" onChange={handleImg} />
          </StyleTest>
          <StyledArea2
            placeholder="내용을 입력해주세요"
            value={edit.article ? edit.article.message : null}
            onChange={handleMessage}
          />
          <div>해시태그</div>
          <TagsInput>
            <ul>
              {hashtag
                ? hashtag.map((tag, index) => (
                    <li key={index}>
                      <span>#{tag}</span>
                      <StyledClose onClick={() => removeTags(index)}>
                        x
                      </StyledClose>
                    </li>
                  ))
                : null}
            </ul>
            <StyledArea3
              type="text"
              onKeyUp={e => (window.event.keyCode === 13 ? addTags(e) : null)}
              onChange={e => setClick(e.target.value)}
              placeholder="해시태그를 입력해주세요"
            />
            <button onClick={handleHash}>추가</button>
          </TagsInput>
        </StyledSize>
        <StyleTest>
          <button onClick={handleClick}>
            {isModify ? "수정" : "글올리기"}
          </button>
        </StyleTest>
      </StyledContent>
    </StyledBody>
  );
};

export default Write;
