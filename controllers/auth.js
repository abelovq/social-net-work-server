const bcrypt = require('bcrypt');

const { User } = require('../server/models');

const { setToken } = require('../utils');

const signUp = async (req, res) => {
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
      res.status(422).send({
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
    res
      .status(400)
      .send({ error: true, message: 'Something goes wrong...' });
  }
};

const signIn = async (req, res) => {
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
      const matchPassword = await bcrypt.compare(
        password,
        user.password,
      );
      if (!matchPassword) {
        res.status(200).send({
          success: false,
          message: 'Authentication failed. Wrong password.',
        });
      } else {
        const { id } = user;
        res.setHeader('Authorization', `Bearer ${setToken({ id })}`);
        res
          .status(201)
          .send({ success: true, message: 'User log in' });
      }
    }
  } catch (err) {
    console.log('err', err);
    res
      .status(400)
      .send({ error: true, message: 'Something goes wrong...' });
  }
};

module.exports = { signUp, signIn };
