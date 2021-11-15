const { Comment } = require("../../models");

module.exports = {
  comment: {
    post: (req, res) => {},
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
    delete: (req, res) => {},
  },
};
