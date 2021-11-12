module.exports = {
    post: (req, res) => {
        res.send('Create comment');
    },
    patch: (req, res) => {
        res.send('Modify comment');
    },
    delete: (req, res) => {
        res.send('Delete comment');
    }
}