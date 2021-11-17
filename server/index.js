const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:80"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
  })
)
app.use(cookieParser());

app.use("/", indexRouter);

const port = 80;

app.listen(port, () => {
  console.log("server on! http://localhost:" + port);
});