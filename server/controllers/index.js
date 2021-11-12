module.exports = {
    // /auth에 대한 Route
    Login: require('./Auth/Login'),
    Logout: require('./Auth/Logout'),
    Signup: require('./Auth/Signup'),
    Email: require('./Auth/Email'),
    Nickname: require('./Auth/Nickname'),

    // /article에 대한 Route
    Article: require('./Article/Article'),
    Tag: require('./Article/Tag'),

    // /user에 대한 Route
    Pwd: require('./User/Pwd'),
    Userinfo: require('./User/Userinfo'),
    Profile: require('./User/Profile'),

    // comment에 대한 Route
    Comment: require('./Comment/Comment')
};
