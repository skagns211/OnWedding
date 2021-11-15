const { Article, Article_Hashtag, Hashtag } = require("../../models");

module.exports = {
  articles: {
    get: async (req, res) => {
      const articles = await Article.findAll();

      if (!articles) {
        res.status(500).send();
      }
      res.json({ data: articles });
    },
  },
  article: {
    post: (req, res) => {
      const { title, message, image, hashtag } = req.body;
      const user_id = req.params.id;
      if (!user_id || !title || !message || !image || !hashtag) {
        res.status(400).send("bad request");
      }

      Article.create({
        user_id,
        title,
        message,
        image,
        hashtag,
      })
        .then(() => {
          console.log("ok");
        })
        .catch(() => {
          console.log("error");
        });
      res.send("createed");
    },
    get: async (req, res) => {
      const id = req.params.id;
      const article = await Article.findOne({
        where: { id },
      });

      if (!article) {
        res.status(500).send();
      }
      res.json({ data: article });
    },
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
                model: Article,
              },
            ],
          },
        ],
        where: { name },
      });

      if (!articles) {
        res.status(500).send();
      }
      res.json({ data: articles });
    },
  },
};
