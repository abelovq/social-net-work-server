const express = require('express');
const passport = require('passport');
const { check } = require('express-validator');

require('../server/config/passport')(passport);

const router = express.Router();

const controller = require('../controllers/comments');

module.exports = passport => {
  router.post(
    '/comments',
    [
      check('message')
        .not()
        .isEmpty()
        .trim(),
      check('commentable_type')
        .not()
        .isEmpty()
        .isIn(['Post', 'Comment']),
      check('commentable_id')
        .not()
        .isEmpty()
        .isInt(),
      // .exists({ checkNull: true }),
    ],
    passport.authenticate('jwt', { session: false }),
    controller.createComment
  );
  router.get(
    '/comments',
    passport.authenticate('jwt', { session: false }),
    controller.getComments
  );
  router.get(
    '/comments/:id',
    passport.authenticate('jwt', { session: false }),
    controller.getCommentById
  );
  router.put(
    '/comments/:id',
    [
      check('message')
        .not()
        .isEmpty(),
    ],
    passport.authenticate('jwt', { session: false }),
    controller.changeCommentById
  );
  router.get(
    '/posts/:id/comments',
    passport.authenticate('jwt', { session: false }),
    controller.getCommentsForPost
  );
  router.post('/comments/test', passport.authenticate('jwt', { session: false }),
    controller.test)

  return router;
};
