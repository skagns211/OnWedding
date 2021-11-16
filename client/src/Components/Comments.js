import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

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
  align-items: center;
`;

const StyledEdit = styled.div`
  > textarea {
    resize: none;
    width: 30rem;
    height: 5rem;
    font-size: 20px;
  }
`;

const Comments = ({ comment, clickDelete }) => {
  const [edit, setEdit] = useState(false);
  const [comments, setComments] = useState(comment.message);

  const handleChange = e => {
    setComments(e.target.value);
  };

  const handleEdit = e => {
    setEdit(!edit);
    if (e.target.textContent === "확인") {
      axios.patch(`http://localhost:4000/comment/${comment.id}`, {
        message: comments,
      });
    }
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:4000/comment/${comment.id}`);
    clickDelete(comment);
  };

  return (
    <StyledTest2>
      <StyledTest src={comment.img}></StyledTest>
      {/* <div>{comment}</div> */}
      <StyledEdit>
        {edit ? (
          <textarea onChange={handleChange}>{comments}</textarea>
        ) : (
          comments
        )}
      </StyledEdit>
      <div>{comment.createdAt}</div>
      <button onClick={handleEdit}>{edit ? "확인" : "수정"}</button>
      <button onClick={handleDelete}>삭제</button>
    </StyledTest2>
  );
};

export default Comments;
