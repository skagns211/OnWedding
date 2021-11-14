// '../../models' -> onWedding DB의 Tables들
const { Article, Article_Hashtag } = require("../../models");

module.exports = {
  articles: {
    get: async (req, res) => {
      const articles = await Article.findAll();

      if (!articles) {
        res.status(500);
      }
      res.json({ data: { articles } });
    },
  },
  article: {
    post: (req, res) => {},
    get: async (req, res) => {
      const articleId = req.params.id;

      const article = await Article.findOne({
        where: { id: articleId },
      });

      if (!article) {
        res.status(500);
      }
      res.json({ data: { article } });
    },
    patch: (req, res) => {},
    delete: (req, res) => {},
  },
  hashtag: {
    get: (req, res) => {},
  },
};
