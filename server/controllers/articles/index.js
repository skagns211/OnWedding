// '../../models' -> onWedding DB의 Tables들
const { Article, Article_Hashtag, Hashtag } = require("../../models");

module.exports = {
  articles: {
    get: (req, res) => {},
  },
  article: {
    post: (req, res) => {},
    get: (req, res) => {},
    patch: (req, res) => {},
    delete: (req, res) => {},
  },
  hashtag: {
    get: async (req, res) => {
      const name = req.params.name;
      const articles = await Hashtag.findAll({
        include: [
          {
            model: Article_Hashtag,
            include: [
                {
                    model: Article
                }
            ]
          }
        ],
        where: { name }
      });

      if (!articles) {
        res.status(500).send()
      } 
      res.json( { data: { articles } } )
    },
  },
};

