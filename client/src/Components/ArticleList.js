import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  & a {
    text-decoration: none;
    color: black;
  }
  &:hover {
    background-color: white;
    border-radius: 4%;
  }
`;

const StyledImg = styled.img`
  width: 20rem;
  height: 20rem;
`;

const StyledName = styled.div`
  font-size: 1.5rem;
`;

const ArticleList = ({ article }) => {
  return (
    <StyledList>
      <Link to={`/article/${article.id}`}>
        {article.image ? (
          <StyledImg src={article.image} />
        ) : (
          <StyledImg
            src={
              "https://onwedding-img.s3.ap-northeast-2.amazonaws.com/default-placeholder-1024x1024.png"
            }
          />
        )}
        <StyledName>{article.title}</StyledName>
        <i className="far fa-comment"></i>
        {article.total_comment}
      </Link>
    </StyledList>
  );
};

export default ArticleList;
