const { User } = require('../../models')

module.exports = {
    login: {
        post: (req, res) => {

        },
    },
    logout: {
        post: (req, res) => {

        },
    },
    signup: {
        post: (req, res) => {
            // signup 요청이 왔을때
            // User에 
        },
    },
    email: {
        post: async (req, res) => {
            const { email } = req.body;
            const getEmail = await User.findOne({
                where: { email }
            });

            if (getEmail) {
                res.status(400).send({ message: 'email overlap' })
            } else {
                res.send({ message: 'ok' })
            };
        },
    },
    nickname: {
        post: async (req, res) => {
            const { nickname } = req.body;
            const getNickname = await User.findOne({
                where: { nickname }
            });

            if (getNickname) {
                res.status(400).send({ message: 'nickname overlap' })
            } else {
                res.send({ message: 'ok' })
            };
        },
    }
};
