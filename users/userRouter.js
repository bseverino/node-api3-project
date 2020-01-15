const express = require('express');

const Users = require('./userDb.js')
const Posts = require('../posts/postDb.js')

const validateUserId = require('../middleware/validateUserId')
const validateUser = require('../middleware/validateUser')
const validatePost = require('../middleware/validatePost')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error adding user.' })
    })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  const newPost = {
    ...req.body,
    user_id: req.user.id
  }

  Posts.insert(newPost)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error adding post.' })
    })
});

router.get('/', (req, res) => {
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'Error retrieving users.'
      })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.user.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'Error retrieving posts.'
      })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then(deleted => {
      res.status(202).json(deleted)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'Error deleting user.'
      })
    })
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
  Users.update(req.user.id, req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error updating user.' })
    })
});

module.exports = router
