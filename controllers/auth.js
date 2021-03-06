const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../server/models');

const { setToken, handleValidation } = require('../utils');

const signUp = async (req, res) => {
  if (handleValidation(req, res)) {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        confirmPassword,
      } = req.body;
      const candidate = await User.findOne({
        where: {
          email,
        },
      });
      if (candidate) {
        res.status(400).send({
          success: false,
          message: 'Email is already registered',
        });
      } else if (confirmPassword !== password) {
        res.status(401).send({
          success: false,
          message: 'Wrong confirm password', // ask status code
        });
      } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
          email,
          firstName,
          lastName,
          password: hashedPassword,
        });
        const { id } = newUser;
        res.setHeader('Authorization', `Bearer ${setToken({ id })}`);
        res
          .status(201)
          .send({ success: true, message: 'User succesfully created' });
      }
    } catch (err) {
      console.log('err', err);
      res.status(400).send({ error: true, message: 'Something goes wrong...' });
    }
  }
};

const signIn = async (req, res) => {
  if (handleValidation(req, res)) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        console.log('usera net');
        res.status(401).send({
          success: false,
          message: 'Authentication failed. User not found.',
        });
      } else {
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
          res.status(401).send({
            success: false,
            message: 'Authentication failed. Wrong password.',
          });
        } else {
          const { id } = user;
          res.setHeader('Authorization', `Bearer ${setToken({ id })}`);
          res.status(200).send({ success: true, message: 'User log in' });
        }
      }
    } catch (err) {
      console.log('err', err);
      res.status(400).send({ error: true, message: 'Something goes wrong...' });
    }
  }
};

const forgotPassword = (req, res) => {
  try {
    res.send('<form action="/passwordreset" method="POST">' +
      '<input type="email" name="email" value="" placeholder="Enter your email address..." />' +
      '<input type="submit" value="Reset Password" />' +
      '</form>');
  } catch (err) {
    console.log('err', err);
    res.status(400).send({ error: true, message: 'Something goes wrong...' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send(400).send({ message: 'Email required' })
    }
    const user = await User.findOne({ where: { email } });
    const userId = user.id;
    const payload = {
      id: userId,
      email,
    };
    const secretWord = 'secret';
    const token = jwt.sign(payload, secretWord);

  } catch (err) {
    console.log('err', err);
    res.status(400).send({ error: true, message: 'Something goes wrong...' });
  }
}

module.exports = { signUp, signIn, forgotPassword };
