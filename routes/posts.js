const express = require('express');
const passport = require('passport');
require('../server/config/passport')(passport);

const router = express.Router();

const controller = require('../controllers/posts');

module.exports = (passport) => {
  router.post(
    '/posts',
    passport.authenticate('jwt', { session: false }),
    controller.createPost,
  );
  router.get(
    '/posts/:id',
    passport.authenticate('jwt', { session: false }),
    controller.getPostById,
  );
  router.get(
    '/posts',
    passport.authenticate('jwt', { session: false }),
    controller.getPosts,
  );
  router.put(
    '/posts/:id',
    passport.authenticate('jwt', { session: false }),
    controller.changePost,
  );

  return router;
};
