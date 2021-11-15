import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";

import dummy from "../dummy/dummy";


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
  align-items: flex-start;
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

const StyledTitle = styled.div`
  font-size: 2rem;
`;

const StyledName = styled.div`
  font-size: 1.5rem;
`;

const StyledText = styled.div`
  font-size: 1.5rem;
`;

const StyledPhoto = styled.div`
  max-width: 50%;
  max-height: 50%;
`;

const Article = () => {
  const id = useParams();

  console.log(id);

  const pick = dummy.filter(dummy => dummy.id === Number(id.id));

  console.log(pick);
  return (
    <div>
      <StyledImg />
      <StyledMiddle></StyledMiddle>
      <StyledContent>
        <StyledTitle>{pick[0].title}</StyledTitle>
        <StyledName>
          {pick[0].name}
          {pick[0].createdAt}
        </StyledName>
        <StyledPhoto>
          <img src={pick[0].img} />
        </StyledPhoto>
        <StyledText>{pick[0].content}</StyledText>
      </StyledContent>
    </div>
  );
};

export default Article;
