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
    patch: async (req, res) => {
      const id = req.params.id;
      const message = req.body.message;

      await Comment.update(
        {
          message,
        },
        {
          where: { id },
        }
      );

      try {
        res.send('ok');
      } catch (err) {
        res.status(500).send();
      }
    },
    delete: async (req, res) => {
      const id = req.params.id;

      await Comment.destroy({
        where: { id },
      });

      try {
        res.send('ok');
      } catch (err) {
        res.status(500).send();
      }
    },
  }
}