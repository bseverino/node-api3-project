const Users = require('../users/userDb.js')

function validateUserId(req, res, next) {
    const id = req.params.id
    Users.getById(id)
        .then(user => {
            if (!user) {
                res.status(400).json({ message: 'Invalid user id.' })
            } else {
                req.user = user
                next()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error retrieving user id.' })
        })
}

module.exports = validateUserId