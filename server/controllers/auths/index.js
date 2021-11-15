const { User } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  login: {
    post: async (req, res) => {
      const { email, password } = req.body;
      const userInfo = await User.findOne({
        where: { email, password },
      });

      if (!userInfo) {
        res.status(200).send({ message: "invalid data" });
      } else {
        const {
          id,
          email,
          name,
          nickname,
          birth,
          mobile,
          createdAt,
          updatedAt,
        } = userInfo;
        const accessToken = jwt.sign(
          {
            id,
            email,
            name,
            nickname,
            birth,
            mobile,
            createdAt,
            updatedAt,
          },
          process.env.ACCESS_SECRET,
          {
            expiresIn: "30m",
          }
        );
        const verifyAccessToken = jwt.verify(
          accessToken,
          process.env.ACCESS_SECRET
        );
        delete userInfo.dataValues.password;
        const loginInfo = userInfo.dataValues;

        try {
          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            credentials: true,
            sameOrigin: "none",
          });
          res.cookie("tokenExpirse", verifyAccessToken.exp, { httpOnly: true });
          console.log(req.cookies);
          res.send({ data: { loginInfo }, message: "login success!" });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  logout: {
    post: (req, res) => {
      res.clearCookie("accessToken").send({ message: "logout success!" });
    },
  },
  signup: {
    post: async (req, res) => {
      const { password, email, name, nickname, birth, mobile } = req.body;
      if (!password || !email || !name || !nickname || !birth || !mobile) {
        res.status(422).send({ message: "require All Info" });
      } else {
        await User.create({
          password,
          email,
          name,
          nickname,
          birth,
          mobile,
        });

        try {
          res.send({ message: "ok" });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  email: {
    post: async (req, res) => {
      const { email } = req.body;
      const getEmail = await User.findOne({
        where: { email },
      });

      if (getEmail) {
        res.status(200).send({ message: "email overlap" });
      } else {
        try {
          res.send({ message: "ok" });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  nickname: {
    post: async (req, res) => {
      const { nickname } = req.body;
      const getNickname = await User.findOne({
        where: { nickname },
      });

      if (getNickname) {
        res.status(200).send({ message: "nickname overlap" });
      } else {
        try {
          res.send({ message: "ok" });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
