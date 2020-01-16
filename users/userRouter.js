const express = require('express');

const router = express.Router();

db = require('./userDb');
posts = require('../posts/postDb');

router.post('/', validateUser, (req, res) => {
  const { userName } = req.body;

  db.insert({ name: userName })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not add user" })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  posts.insert({ user_id: req.params.id, text: req.body.text })
    .then(post => {
      res.status(200).json({ message: post })
    })
    .catch(err => {
      res.status(500).json({ message: "Could not post" })
    })
});

// Do we really need MW here? No, we do not.
router.get('/', (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({ message: "Couldn't get from Data base" })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  let id = req.params.id;

  db.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be retrieved." });
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  db.getUserPosts(req.user.id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      }
      else {
        res.status(400).json({ message: "This user has no posts" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Couldn't get posts" })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  db.remove(req.user.id)
    .then(() => {
      res.status(200).json({ message: `user with id ${req.user.id} was removed` })
    })
    .catch(err => {
      res.status(500).json({ message: "Couldn't delete the user" })
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  db.update(req.user.id, { name: req.body.name })
    .then(() => {
      db.getById(req.user.id)
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => {
          res.status(500).json({ message: "Could not get updated user." });
        });
    })
    .catch(err => {
      res.status(500).json({ message: "Could not update user." });
    });
});

module.exports = router;