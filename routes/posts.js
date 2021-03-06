const express = require('express');
const passport = require('passport');
const { check } = require('express-validator');

require('../server/config/passport')(passport);

const router = express.Router();

const controller = require('../controllers/posts');

module.exports = passport => {
  router.post(
    '/posts',
    [
      check('title')
        .not()
        .isEmpty()
        .trim(),
      check('description')
        .not()
        .isEmpty()
        .trim(),
    ],
    passport.authenticate('jwt', { session: false }),
    controller.createPost
  );
  router.get(
    '/posts/:id',
    passport.authenticate('jwt', { session: false }),
    controller.getPostById
  );
  router.get(
    '/posts',
    passport.authenticate('jwt', { session: false }),
    controller.getPosts
  );
  router.put(
    '/posts/:id',
    [
      check('title')
        .not()
        .isEmpty()
        .trim(),
      check('description')
        .not()
        .isEmpty()
        .trim(),
    ],
    passport.authenticate('jwt', { session: false }),
    controller.changePost
  );
  router.delete(
    '/posts/:id',
    passport.authenticate('jwt', { session: false }),
    controller.deletePost
  );

  return router;
};
