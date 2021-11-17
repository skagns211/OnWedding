import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Delete = () => {
  //! 회원탈퇴 상태 state
  const [isComplete, setIsComplete] = useState(false);
  const history = useNavigate();

  const handleComplete = () => {
    //! 홈으로 리다이렉트해주기 위한 함수
    // setIsComplete(true);

    axios
      .delete("https://localhost:4000/user", { withCredentials: true })
      .then((res) => {
        console.log(res.data.message);
        const resMsg = res.data.message;
        if (resMsg === "success delete userInfo") {
          setIsComplete(true);
          setTimeout(() => {
            history("/");
            setIsComplete(false);
            console.log(isComplete);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return isComplete ? (
    <div>
      <center>
        <div>비밀번호가 성공적으로 변경되었습니다.</div>
      </center>
    </div>
  ) : (
    <>
      <center>
        <div>회원탈퇴</div>
        <div>
          <button type="submit" onClick={handleComplete}>
            Delete Account
          </button>
        </div>
      </center>
    </>
  );
};
export default Delete;
