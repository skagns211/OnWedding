import React, { useState } from "react";
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

const Write = () => {
  // const [img, setImg] = useState(null);

  const handleImg = e => {
    const imgFile = e.taret.files[0];
  };

  const [tags, setTags] = useState([]);

  console.log(tags);

  const removeTags = e => {
    setTags(tags.filter((_, index) => index !== e));
  };

  const addTags = e => {
    const filtered = tags.filter(el => el === e.target.value);
    if (e.target.value !== "" && filtered.length === 0) {
      setTags([...tags, e.target.value]);
      e.target.value = "";
    }
  };

  return (
    <StyledBody>
      <StyledImg />
      <StyledMiddle></StyledMiddle>
      <StyledContent>
        <StyledTitle>글쓰기</StyledTitle>
        <StyledSize>
          <div>제목</div>
          <StyledArea1 type="text" placeholder="제목을 입력해주세요" />
          <StyleTest>
            내용
            <input
              type="file"
              accept="image/jpg,impge/png,image/jpeg,image/gif"
              onChange={handleImg}
            />
          </StyleTest>
          <StyledArea2 placeholder="내용을 입력해주세요" />
          <div>해시태그</div>
          <TagsInput>
            <ul>
              {tags.map((tag, index) => (
                <li key={index}>
                  <span>#{tag}</span>
                  <StyledClose onClick={() => removeTags(index)}>x</StyledClose>
                </li>
              ))}
            </ul>
            <StyledArea3
              type="text"
              onKeyUp={e => (window.event.keyCode === 13 ? addTags(e) : null)}
              placeholder="해시태그를 입력해주세요"
            />
          </TagsInput>
        </StyledSize>
        <StyleTest>
          <button>글올리기</button>
        </StyleTest>
      </StyledContent>
    </StyledBody>
  );
};

export default Write;
