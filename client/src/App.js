import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Article from "./Pages/Article";
import ChangePassword from "./Pages/ChangePassword";
import Delete from "./Pages/Delete";
import Main from "./Pages/Main";
import MyPage from "./Pages/MyPage";
import SignUp from "./Pages/SignUp";
import Write from "./Pages/Write";

import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

const StyledBody = styled.div`
  margin: 0;
  padding: 0;
  background-color: #f4eae0;
  box-sizing: border-box;
`;

function App() {
  const [edit, setEdit] = useState("");

  useEffect(() => {
    setEdit("");
  }, [edit]);

  return (
    <BrowserRouter>
      <StyledBody>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/write" element={<Write edit={edit} />} />
          <Route path="/article/:id" element={<Article setEdit={setEdit} />} />
          <Route path="change" element={<ChangePassword />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
        <Footer />
      </StyledBody>
    </BrowserRouter>
  );
}

export default App;
