const express = require('express');

const Posts = require('./postDb.js')

const validatePostId = require('../middleware/validatePostId')
const validatePost = require('../middleware/validatePost')

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get(req.query)
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

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.post.id)
    .then(deleted => {
      res.status(202).json(deleted)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'Error deleting post.'
      })
    })
});

router.put('/:id', validatePost, validatePostId, (req, res) => {
  Posts.update(req.post.id, req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error updating post.' })
    })
});

module.exports = router;
