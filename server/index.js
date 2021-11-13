const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://localhost:3000"],
    Credential: true,
    method: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
  })
);
app.use(cookieParser());

app.use("/", indexRouter);

const port = 3000;

app.listen(port, () => {
  console.log("server on! http://localhost:" + port);
});
