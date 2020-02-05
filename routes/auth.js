const express = require('express');

const router = express.Router();
const controller = require('../controllers/auth');

module.exports = (passport) => {
  router.post('/sign_up', controller.signUp);
  router.post('/sign_in', controller.signIn);

  return router;
};
