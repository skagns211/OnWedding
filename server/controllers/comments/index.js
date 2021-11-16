const { Comment } = require("../../models");

module.exports = {
  comment: {
    post: async (req, res) => {
      const { accessToken, tokenExpirse } = req.cookies;
      if (tokenExpirse <= Date.now() / 1000) {
        res
          .clearCookie("accessToken")
          .status(401)
          .send({ message: "accessToken Expiration. plz Loing" });
      } else if (!accessToken) {
        res.status(403).send({ message: "not logged in" });
      }

      const user_id = req.params.userId;
      const article_id = req.params.articleId;
      const message = req.body.message;

      const comment = await Comment.create({
        user_id,
        article_id,
        message,
      });

      const id = await Comment.findOne({
        where: { id },
      });

      try {
        res.status(201).send({ data: { comment } });
      } catch (err) {
        res.status(500).send();
      }
    },
    patch: async (req, res) => {
      const { accessToken, tokenExpirse } = req.cookies;
      if (tokenExpirse <= Date.now() / 1000) {
        res
          .clearCookie("accessToken")
          .status(401)
          .send({ message: "accessToken Expiration. plz Loing" });
      } else if (!accessToken) {
        res.status(403).send({ message: "not logged in" });
      }

      const id = req.params.id;
      const message = req.body.message;
      const commentNum = await Comment.update(
        {
          message,
        },
        {
          where: { id },
        }
      );

      const comment_id = commentNum[0];
      const comment = await Comment.findOne({
        where: { id: comment_id },
      });

      try {
        res.send({ data: { comment } });
      } catch (err) {
        res.status(500).send();
      }
    },
    delete: async (req, res) => {
      const { accessToken, tokenExpirse } = req.cookies;
      if (tokenExpirse <= Date.now() / 1000) {
        res
          .clearCookie("accessToken")
          .status(401)
          .send({ message: "accessToken Expiration. plz Loing" });
      } else if (!accessToken) {
        res.status(403).send({ message: "not logged in" });
      }

      const id = req.params.id;

      await Comment.destroy({
        where: { id },
      });

      try {
        res.status(204).send("deleted");
      } catch (err) {
        res.status(500).send();
      }
    },
  },
};
