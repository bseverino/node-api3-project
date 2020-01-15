function validateUser(req, res, next) {
    const body = req.body
    if (Object.keys(body).length === 0) {
        res.status(400).json({ message: 'Missing user data.' })
    } else if (!body.name) {
        res.status(400).json({ message: 'Missing required name field.' })
    } else {
        next()
    }
}

module.exports = validateUser