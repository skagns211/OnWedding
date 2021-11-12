const express = require('express');
const app = express();
const controllers = require('./controllers');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ["https://localhost:3000"],
        Credential: true,
        method: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"]
    })
)
app.use(cookieParser());

// ㅊ..치ㅣ지...치지직... 현재 시각.. 03시.. 06ㅂ..ㅜㄴ.... 살ㄹ....ㅕ주...세요.. 푸쉬..멀지... ㅎ...ㅐ야하...ㅂ니다...
// /auth 요청에 대한 Route
app.post("/auth/login", controllers.Login);
app.post("/auth/logout", controllers.Logout);
app.post("/auth/signup", controllers.Signup);
app.post("/auth/email", controllers.Email);
app.post("/auth/nickname", controllers.Nickname);

// /article 요청에 대한 Route
app.post("/article", controllers.Article.post);
app.get("/article", controllers.Article.get);
app.get("/article/:id", controllers.Article.get);
app.get("/article/tag", controllers.Tag);
app.patch("/article/:id", controllers.Article.patch);
app.delete("/article/:id", controllers.Article.delete);

// /user 요청에 대한 Route
app.post("/user/pwd", controllers.Pwd.post);
app.get("/user", controllers.Userinfo.get);
app.patch("/user", controllers.Pwd.patch);
app.post("/user", controllers.Profile);
app.post("/user", controllers.Userinfo.delete);

// /comment 요청에 대한 Route
app.post("comment/:id", controllers.Comment.post);
app.patch("comment/:id", controllers.Comment.patch);
app.delete("comment/:id", controllers.Comment.delete);

const port = 3000;

app.listen(port, () => {
    console.log('server on! http://localhost:' + port);
});
