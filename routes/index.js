const express = require('express');
const passport = require('passport');

const router = express.Router();

router.use('/', require('./auth')(passport));
router.use('/users', require('./users')(passport));

module.exports = router;
