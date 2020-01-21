const express = require('express');

const Posts = require('./postDb.js')

const validateId = require('../middleware/validateId')
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

router.get('/:id', validateId(Posts), (req, res) => {
  res.status(200).json(req.resource)
});

router.delete('/:id', validateId(Posts), (req, res) => {
  Posts.remove(req.resource.id)
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

router.put('/:id', validatePost, validateId(Posts), (req, res) => {
  Posts.update(req.resource.id, req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error updating post.' })
    })
});

module.exports = router;
