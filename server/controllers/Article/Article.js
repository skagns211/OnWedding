module.exports = {
    post: (req, res) => {
        res.send('create article');
    },
    get: (req, res) => {
        if (req.params.id) {
            res.send('get id article');
        }
        res.send('get all article');
    },
    patch: (req, res) => {
        res.send('modify article');
    },
    delete: (req, res) => {
        res.send('delete article');
    }
}