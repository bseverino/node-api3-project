function validatePost(req, res, next) {
    const body = req.body
    if (Object.keys(body).length === 0) {
        res.status(400).json({ message: 'Missing user data.' })
    } else if (!body.text) {
        res.status(400).json({ message: 'Missing required text field.' })
    } else {
        next()
    }
}

module.exports = validatePost