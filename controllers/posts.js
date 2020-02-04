const express = require('express');

const router = express.Router();

const { Post } = require('../server/models');

const { getToken } = require('../utils');

const createPost = async (req, res) => {
  const { title, description } = req.body;
  try {
    const token = getToken(req.headers);
    if (token) {
      const { title, description } = req.user;
      res.status(200).send({ firstName, lastName, email });
    } else {
      res
        .status(403)
        .json({ success: false, message: 'qw Unauthorized.' });
    }
  } catch (err) {
    res
      .status(400)
      .send({ error: true, message: 'Something goes wrong...' });
  }
};

const getPosts = async (req, res) => {
  const { title, description } = req.body;
  try {
    const token = getToken(req.headers);
    if (token) {
      const { title, description } = req.user;
      res.status(200).send({ firstName, lastName, email });
    } else {
      res
        .status(403)
        .json({ success: false, message: 'qw Unauthorized.' });
    }
  } catch (err) {
    res
      .status(400)
      .send({ error: true, message: 'Something goes wrong...' });
  }
};

module.exports = { getPosts, createPost };
