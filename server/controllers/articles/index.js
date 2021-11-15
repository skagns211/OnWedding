const {
  Article,
  Article_Hashtag,
  Hashtag,
  Comment,
  User,
} = require("../../models");

module.exports = {
  articles: {
    get: async (req, res) => {
      const articles = await Article.findAll();

      if (!articles) {
        res.status(500).send();
      }
      res.json({ data: { articles } });
    },
  },
  article: {
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

      const { title, message, image, hashtag } = req.body;
      const user_id = req.params.id;

      if (!user_id || !title || !message) {
        res.status(400).send("bad request");
      }

      const articleId = await Article.create({
        user_id,
        title,
        message,
        image,
      });

      for (const tag of hashtag) {
        const [tags, created] = await Hashtag.findOrCreate({
          where: { name: tag },
        });

        await Article_Hashtag.create({
          hashtag_id: tags.dataValues.id,
          article_id: articleId.dataValues.id,
        });

        if (!created) {
          await Article_Hashtag.create({
            hashtag_id: tags.dataValues.id,
            article_id: articleId.dataValues.id,
          });
        }
      }

      try {
        res.send("created");
      } catch (err) {
        res.status(500).send();
      }
    },
    get: async (req, res) => {
      const id = req.params.id;
      const article = await Article.findOne({
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
        where: { id },
      });
      const comments = await Comment.findAll({
        where: { article_id: id },
      });

      if (!article) {
        res.status(500).send();
      }
      res.json({ data: { article, comments } });
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
      const { title, message, image, hashtag } = req.body;

      if (!title || !message) {
        res.status(400).send("bad request");
      }
      await Article.update(
        {
          title,
          message,
          image,
        },
        {
          where: { id },
        }
      );

      await Article_Hashtag.destroy({
        where: { article_id: id },
      });

      for (const tag of hashtag) {
        const [tags, created] = await Hashtag.findOrCreate({
          where: { name: tag },
        });
        await Article_Hashtag.create({
          hashtag_id: tags.dataValues.id,
          article_id: id,
        });
        if (!created) {
          await Article_Hashtag.create({
            hashtag_id: tags.dataValues.id,
            article_id: id,
          });
        }
      }

      try {
        res.status(201).send("updated");
      } catch (err) {
        res.status(500);
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

      await Article_Hashtag.destroy({
        where: { article_id: id },
      });

      await Article.destroy({
        where: { id },
      });

      try {
        res.status(204).send("ok");
      } catch (err) {
        res.status(500).send();
      }
    },
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
      res.json({ data: { articles } });
    },
  },
};
