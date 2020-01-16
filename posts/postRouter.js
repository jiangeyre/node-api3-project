const express = require('express');

const POST = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  POST.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts could not be retrieved." });
    })
});

router.get('/:id', (req, res) => {
  let id = req.params.id;

  POST.getById
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  let id = req.params.id;

  POST.getById(id)
    .then(post => {
      req.post = post;

      next();
    })
    .catch(err => {
      res.status(400).json({ message: "Invalid user ID." });
    })
};

module.exports = router;
