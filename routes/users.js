const express = require('express');
const passport = require('passport');
require('../server/config/passport')(passport);

const router = express.Router();

const controller = require('../controllers/users');

module.exports = passport => {
  router.get(
    '/me',
    passport.authenticate('jwt', { session: false }),
    controller.getProfile,
  );

  return router;
};
