const express = require('express')
const cors = require('cors')
const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')

const logger = require('./middleware/logger.js')

const server = express()

server.use(cors())
server.use(express.json())
server.use(logger)

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

module.exports = server