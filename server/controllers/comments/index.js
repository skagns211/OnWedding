const { Comment } = require("../../models");

module.exports = {
  comment: {
    post: async (req, res) => {
      const { user_id, article_id, message } = req.body;

      await Comment.create({
        user_id,
        article_id,
        message,
      });

      try {
        res.status(201).send("ok");
      } catch (err) {
        res.status(500).send();
      }
    },
    patch: (req, res) => {},
    delete: (req, res) => {},
  },
};
