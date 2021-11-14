import React from "react";
import styled from "styled-components";

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
  align-items: center;
  & button {
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    font-size: 1rem;
  }
  & div {
    display: flex;
    flex-direction: column;
    margin-top: 4rem;
  }
`;

const StyledArea1 = styled.input`
  margin: 2rem;
  font-size: 20px;
  width: 1000px;
`;

const StyledArea2 = styled.input`
  margin: 2rem;
  font-size: 20px;
  width: 1000px;
  height: 500px;
`;

const StyledTitle = styled.div`
  font-size: 2rem;
`;

const Write = () => {
  return (
    <div>
      <StyledImg />
      <StyledMiddle></StyledMiddle>
      <StyledContent>
        <StyledTitle>글쓰기</StyledTitle>
        <div>
          제목
          <StyledArea1 type="text" />
          내용
          <StyledArea2 type="text" />
          해시태그
          <StyledArea1 type="text" />
        </div>
        <button>글올리기</button>
      </StyledContent>
    </div>
  );
};

export default Write;
