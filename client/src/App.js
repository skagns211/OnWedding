import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Article from "./Pages/Article";
import ChangePassword from "./Pages/ChangePassword";
import Delete from "./Pages/Delete";
import Main from "./Pages/Main";
import MyPage from "./Pages/MyPage";
import SignUp from "./Pages/SignUp";
import Write from "./Pages/Write";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/write" element={<Write />} />
          <Route path="change" element={<ChangePassword />} />
          <Route path="article" element={<Article />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
