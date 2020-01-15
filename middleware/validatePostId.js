const Posts = require('../posts/postDb.js')

function validatePostId(req, res, next) {
    const id = req.params.id
    Posts.getById(id)
        .then(post => {
            if (!post) {
                res.status(400).json({ message: 'Invalid post id.' })
            } else {
                req.post = post
                next()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error retrieving post id.' })
        })
}

module.exports = validatePostId