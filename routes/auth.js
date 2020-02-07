const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const controller = require('../controllers/auth');

module.exports = passport => {
  router.post(
    '/sign_up',
    [check('email').isEmail(), check('password').isLength({ min: 6 })],
    controller.signUp
  );
  router.post(
    '/sign_in',
    [check('email').isEmail(), check('password').isLength({ min: 6 })],
    controller.signIn
  );
  router.get('/forgotpassword', controller.forgotPassword)
  return router;
};
