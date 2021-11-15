const { Comment } = require("../../models");

module.exports = {
  comment: {
    post: (req, res) => {},
    patch: (req, res) => {},
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
  },
};
