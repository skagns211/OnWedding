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

const Comments = ({ comment, handleDelete }) => {
  const [data, setData] = useState(comment);
  const [edit, setEdit] = useState(false);
  const [comments, setComments] = useState(comment.comment);
  const [change, setChange] = useState("");

  const handleChange = e => {
    setComments(e.target.value);
  };

  const handleEdit = e => {
    setEdit(!edit);
    if (e.target.textContent === "확인") {
      setChange(comments);
    }
  };

  // 댓글 수정 patch
  // comment/commentid
  // axios.patch(`http://localhost:4000/comment/`, {
  //   message: `${change}`,
  // });

  // 댓글 삭제 delete
  // comment/commentid
  // axios delete도 보내고
  // state에서도 뺀다
  // axios.delete(`http://localhost:4000/comment/`);

  return (
    <StyledTest2>
      <StyledTest src={comment.img}></StyledTest>
      {/* <div>{comment}</div> */}
      <StyledEdit>
        {edit ? (
          <textarea onChange={handleChange}>{comment}</textarea>
        ) : (
          comment.message
        )}
      </StyledEdit>
      <div>{comment.createdAt}</div>
      <button onClick={handleEdit}>{edit ? "확인" : "수정"}</button>
      <button onClick={handleDelete}>삭제</button>
    </StyledTest2>
  );
};

export default Comments;
