import React from "react";
import styled from "styled-components";

const StyledMain = styled.div`
  display: flex;
  background-color: #f4eae0;
  align-items: center;
`;

const StyledBody = styled.div`
  background-color: #f4eae0;
  display: table-cell;
  width: 100%;
`;

const StyledImg = styled.div`
  background-image: url("https://i.ibb.co/x5HNV5z/bride-g8bfa369fe-1920.jpg");
  background-position: center;
  background-size: cover;
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
`;

const StyledTitle = styled.input`
  margin: 2rem;
  padding: 0.5rem 20rem;
`;

const StyledText = styled.input`
  margin: 2rem;
  padding: 0rem 20rem 20rem 20rem;
`;

const StyledButton = styled.button`
  border: 0px;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
`;

const Write = () => {
  return (
    <StyledMain>
      <StyledBody>
        <StyledImg />
        <StyledMiddle></StyledMiddle>
        <StyledContent>
          <div>글쓰기</div>
          <div>
            제목
            <StyledTitle type="text" />
          </div>
          <div>
            내용
            <StyledText type="text" />
          </div>
          <div>
            해시태그
            <StyledTitle type="text" />
          </div>
          <StyledButton>글올리기</StyledButton>
        </StyledContent>
      </StyledBody>
    </StyledMain>
  );
};

export default Write;
