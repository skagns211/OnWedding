// '../../models' -> onWedding DB의 Tables들
const { Article, Article_Hashtag } = require('../../models')

module.exports = {
    articles: {
        get: async (req, res) => {
            const test = await Article.findOne({
                where: { id: 1 }
            })
            console.log(test.title)
            // 종서 ❤️ 태형
        },
    },
    article: {
        post: (req, res) => {

        },
        get: (req, res) => {

        },
        patch: (req, res) => {

        },
        delete: (req, res) => {

        },
    },
    hashtag: {
        get: (req, res) => {

        },
    }
};
