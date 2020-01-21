function validateId(db) {
    return function(req, res, next) {
    const id = req.params.id
        db.getById(id)
            .then(resource => {
                if (!resource) {
                    res.status(400).json({ message: 'Invalid id.' })
                } else {
                    req.resource = resource
                    next()
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'Error retrieving id.' })
            })
    }
}

module.exports = validateId