import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const StyledBody = styled.body`
  margin: 0;
  padding: 0;
  background-color: #f4eae0;
  box-sizing: border-box;
`;

function App() {
  return (
    <BrowserRouter>
      <StyledBody>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/write" element={<Write />} />
          <Route path="/article/:id" element={<Article />} />
          {/* <Route path="/mypage" element={<MyPage />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="change" element={<ChangePassword />} />*/}
        </Routes>
        <Footer />
      </StyledBody>
    </BrowserRouter>
  );
}

export default App;
