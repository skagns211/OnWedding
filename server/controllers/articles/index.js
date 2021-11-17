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

      try {
        res.json({ data: { articles } });
      } catch (err) {
        console.log(err)
      }
    },
  },
  article: {
    post: async (req, res) => {
      const { accessToken, tokenExpirse } = req.cookies;
      if (tokenExpirse <= Date.now() / 1000) {
        res
          .clearCookie("accessToken")
          .send({ message: "accessToken Expiration. plz Loing" });
      } else if (!accessToken) {
        res.send({ message: "not logged in" });
      } else {
        const { title, message, image, hashtag } = req.body;
        const user_id = req.params.id;

        if (!user_id || !title || !message) {
          res.send("bad request");
        }

        const article = await Article.create({
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
            hashtag_id: tags.id,
            article_id: article.id,
          });
        }
        try {
          res.send("created");
        } catch (err) {
          console.log(err)
        }
      }
    },
    
    get: async (req, res) => {
      const id = req.params.id;
      const article = await Article.findOne({
        where: { id },
      });
      const username = await User.findOne({
        attributes: ["name"],
        where: { id: article.user_id },
      });
      const comments = await Comment.findAll({
        where: { article_id: id },
      });
      const commentUser = await User.findAll({
        attributes: ["nickname"],
        include: [{
          model: Comment,
          attributes: [],
          where: {
            article_id: id
          }
        }]
      })
      const hashtag = await Hashtag.findAll({
        attributes: ["name"],
        include: [
          {
            model: Article_Hashtag,
            attributes: [],
            where: {
              article_id: id,
            },
          },
        ],
      });

      try {
        res.json({ data: { article, comments, username, hashtag, commentUser } });
      } catch (err) {
        console.log(err)
      }
    },
    patch: async (req, res) => {
      const { accessToken, tokenExpirse } = req.cookies;
      if (tokenExpirse <= Date.now() / 1000) {
        res
          .clearCookie("accessToken")
          .send({ message: "accessToken Expiration. plz Loing" });
      } else if (!accessToken) {
        res.send({ message: "not logged in" });
      } else {
        const id = req.params.id;
        const { title, message, image, hashtag } = req.body;

        if (!title || !message) {
          res.send("bad request");
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
            hashtag_id: tags.id,
            article_id: id,
          });
        }
        try {
          res.status(201).send("updated");
        } catch (err) {
          console.log(err)
        }
      }
    },
    delete: async (req, res) => {
      const { accessToken, tokenExpirse } = req.cookies;
      if (tokenExpirse <= Date.now() / 1000) {
        res
          .clearCookie("accessToken")
          .send({ message: "accessToken Expiration. plz Loing" });
      } else if (!accessToken) {
        res.send({ message: "not logged in" });
      } else {
        const id = req.params.id;

        await Comment.destroy({
          where: { article_id: id}
        })
        await Article_Hashtag.destroy({
          where: { article_id: id },
        });
        await Article.destroy({
          where: { id },
        });
          
        try {
          res.status(204).send("ok");
        } catch (err) {
          console.log(err)
        }
      }
    },
  },
  hashtag: {
    get: async (req, res) => {
      const name = req.params.name;
      const articles = await Article.findAll({
        include: [
          {
            model: Article_Hashtag,
            attributes: [],
            include: [
              {
                model: Hashtag,
                where: { name },
              },
            ],
          },
        ],
      });

      try {
        res.json({ data: { articles } });
      } catch (err) {
        console.log(err)
      }
    },
  },
};
