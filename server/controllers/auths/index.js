const { User } = require("../../models");

module.exports = {
  login: {
    post: (req, res) => {
      console.log(req.body);
    },
  },
  logout: {
    post: (req, res) => {},
  },
  signup: {
    post: (req, res) => {},
  },
  email: {
    post: (req, res) => {},
  },
  nickname: {
    post: (req, res) => {},
  },
};
