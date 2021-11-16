const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { access } = require("fs");
require("dotenv").config();

module.exports = {
  password: {
    post: async (req, res) => {
      const { accessToken } = req.cookies;
      const { tokenExpirse } = req.cookies;
      if (tokenExpirse <= Date.now() / 1000) {
        res
          .clearCookie("accessToken")
          .status(401)
          .send({ message: "accessToken Expiration. plz Loing" });
      } else if (!accessToken) {
        res.status(403).send({ message: "not logged in" });
      }
      const { password } = req.body;
      const loginUser = jwt.verify(accessToken, process.env.ACCESS_SECRET);
      const { id } = loginUser;
      const userInfo = await User.findOne({
        where: { id },
      });
      console.log(userInfo);
      if (userInfo.password === password) {
        try {
          res.send({ message: "valid password" });
        } catch (err) {
          console.log(err);
        }
      } else {
        res.send({ message: "invalid password" });
      }
    },
    patch: async (req, res) => {
      const { accessToken } = req.cookies;
      const { tokenExpirse } = req.cookies;

      if (tokenExpirse <= Date.now() / 1000) {
        res
          .clearCookie("accessToken")
          .status(401)
          .send({ message: "accessToken Expiration. plz Loing" });
      } else if (accessToken) {
        const newPassword = req.body.password;
        const { accessToken } = req.cookies;
        const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const loginInfo = await User.findOne({
          where: { id: userInfo.id },
        });
        const curPassword = loginInfo.password;

        await User.update(
          { password: newPassword },
          {
            where: { password: curPassword },
          }
        );

        try {
          res.send({ message: "success change password" });
        } catch (err) {
          console.log(err);
        }
      } else {
        res.status(200).send({ message: "not logged in" });
      }
      userInfo: {
        get: async (req, res) => {
          const { accessToken } = req.cookies;
          const { tokenExpirse } = req.cookies;
          // accessToken 만료 여부 체크
          if (tokenExpirse <= Date.now() / 1000) {
            res
              .clearCookie("accessToken")
              .status(401)
              .send({ message: "accessToken Expiration. plz Loing" });
          } else if (accessToken) {
            const userInfo = await jwt.verify(
              accessToken,
              process.env.ACCESS_SECRET
            );
            try {
              res.send({ data: { userInfo }, message: "present Userinfo" });
            } catch (err) {
              console.log(err);
            }
          } else {
            res.status(403).send({ message: "not logged in" });
          }
        },
          delete: async (req, res) => {
            const { accessToken } = req.cookies;
            const { tokenExpirse } = req.cookies;
            if (tokenExpirse <= Date.now() / 1000) {
              res
                .clearCookie("accessToken")
                .status(401)
                .send({ message: "accessToken Expiration. plz Loing" });
            } else if (accessToken) {
              const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
              const { id, email } = userInfo;
              const loginInfo = await User.findOne({
                where: { id, email },
              });
              console.log(loginInfo);
              await User.destroy({
                where: { id, email },
              });
              try {
                res.clearCookie("accessToken");
                res.send({ message: "success delete userInfo" });
              } catch (err) {
                console.log(err);
              }
            }
          },
  },
      profile: {
        patch: (req, res) => { },
  },
    };