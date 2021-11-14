const { User } = require('../../models')
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    login: {
        post: async (req, res) => {
            const { email, password } = req.body;
            const userInfo = await User.findOne({
                where: { email, password }
            })

            if (!userInfo) {
                res.status(403).send({ message: 'invalid data' })
            } else {
                const { id, email, name, nickname, birth, mobile, createdAt, updatedAt } = userInfo;
                const accessToken = jwt.sign({
                    id,
                    email,
                    name,
                    nickname,
                    birth,
                    mobile,
                    createdAt,
                    updatedAt
                },
                    process.env.ACCESS_SECRET, {
                    expiresIn: '30m'
                });
                delete userInfo.dataValues.password;
                const loginInfo = userInfo.dataValues;
                res.send({ data: { accessToken, loginInfo }, message: 'login success!' })
            }
        },
    },
    logout: {
        post: (req, res) => {

        },
    },
    signup: {
        post: (req, res) => {
            const { password, email, name, nickname, birth, mobile } = req.body;
            if (!password || !email || !name || !nickname || !birth || !mobile) {
                res.status(422).send({ message: 'require All Info' })
            } else {
                User.create({
                    password,
                    email,
                    name,
                    nickname,
                    birth,
                    mobile
                })
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                res.send({ message: 'ok' })
            }
        }
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
