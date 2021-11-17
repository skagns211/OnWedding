import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import Comments from "../Components/Comments";
import axios from "axios";

const StyledBody = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const StyledImg = styled.div`
  background-image: url("https://i.ibb.co/x5HNV5z/bride-g8bfa369fe-1920.jpg");
  background-position: center;
  background-size: contain auto;
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

const StyledTest = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
`;

const StyledTest2 = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid lightgray;
  padding: 1rem;
  background-color: white;
  justify-content: center;
  align-items: center;
  > textarea {
    width: 80%;
    height: 8rem;
    resize: none;
    margin-left: 1rem;
  }
`;

const StyledTest3 = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  background-color: white;
  > button {
    margin: 1rem;
    padding: 1rem;
  }
`;

const StyledTest4 = styled.div``;

const Article = ({ setEdit, isLogin, userInfo, setIsModify }) => {
  const id = useParams();

  const [articleComments, setArticleComments] = useState([]);
  const [article, setArticle] = useState("");
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [hashtags, setHashtags] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/article/${Number(id.id)}`, {
        withCredentials: true,
      })
      .then(response => {
        setArticleComments(response.data.data.comments);
        setArticle(response.data.data.article);
        setUsername(response.data.data.username);
        setHashtags(response.data.data.hashtag);
      });
  }, []);

  const handleClick = () => {
    axios
      .post(`http://localhost:4000/comment/${userInfo.id}/${article.id}`, {
        message: text,
      })
      .then(res => {
        const arr = articleComments.slice();
        setArticleComments([...arr, res.data.data.comment]);
      });
    setText("");
  };

  const handletext = e => {
    setText(e.target.value);
  };

  const handleEdit = () => {
    setEdit({ article, hashtags });
    setIsModify(true);
  };

  const clickDelete = e => {
    const del = articleComments.filter(change => change.id !== e.id);
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      setArticleComments(del);
    }
  };

  return (
    <StyledBody>
      <StyledImg />
      <StyledMiddle></StyledMiddle>
      <StyledContent>
        <StyledTitle>{article.title}</StyledTitle>
        <StyledName>{username.name}</StyledName>
        <StyledPhoto>{/* <img src={article.image.data} /> */}</StyledPhoto>
        <StyledText>{article.message}</StyledText>
        <div>
          해시태그
          {hashtags
            ? hashtags.map(hashtag => {
                return <div>{hashtag.name}</div>;
              })
            : null}
        </div>
        {userInfo.id === article.user_id ? (
          <Link to="/write" onClick={handleEdit}>
            <button>수정</button>
          </Link>
        ) : null}
      </StyledContent>

      <StyledTest4>
        {articleComments &&
          articleComments.map(comment => {
            return (
              <Comments
                clickDelete={() => clickDelete(comment)}
                comment={comment}
                key={comment.id}
                userInfo={userInfo}
              />
            );
          })}
      </StyledTest4>

      <StyledTest2>
        {/* <StyledTest src={article.image.data}></StyledTest> */}
        <textarea value={text} onChange={handletext} />
      </StyledTest2>
      <StyledTest3>
        {isLogin ? <button onClick={handleClick}>댓글쓰기</button> : null}
      </StyledTest3>
    </StyledBody>
  );
};

export default Article;
