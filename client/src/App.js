import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Article from "./Pages/Article";
import ChangePassword from "./Pages/ChangePassword";
import Delete from "./Pages/Delete";
import Main from "./Pages/Main";
import MyPage from "./Pages/MyPage";
import SignUp from "./Pages/SignUp";
import Write from "./Pages/Write";

import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/write" element={<Write />} />
          <Route path="article" element={<Article />} />
          {/* <Route path="/mypage" element={<MyPage />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="change" element={<ChangePassword />} />*/}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
