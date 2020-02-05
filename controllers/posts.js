const { Post } = require('../server/models');

const { getToken } = require('../utils');

const createPost = async (req, res) => {
  const { title, description } = req.body;
  try {
    const token = getToken(req.headers);
    if (token) {
      const { id } = req.user;
      const post = await Post.create({
        title,
        description,
        user_id: id,
      });
      res.status(200).send(post);
    } else {
      res.status(403).json({ success: false, message: 'qw Unauthorized.' });
    }
  } catch (err) {
    console.log('err', err);
    res.status(400).send({ error: true, message: 'Something goes wrong...' });
  }
};

const getPostById = async (req, res) => {
  const token = getToken(req.headers);
  if (token) { // ask try catch first ??
    try {
      const { id } = req.params;
      console.log('id', id);
      const post = await Post.findOne({ where: { id } });
      if (!post) {
        return res.status(404).send({ sucess: false, message: 'No post with this id' });
      }
      res.status(200).send({ sucess: true, post });
    } catch (err) {
      console.log('err', err);
      res.status(400).send({ error: true, message: 'Something goes wrong...' });
    }
  } else {
    // no token
    res.status(403).json({ success: false, message: 'qw Unauthorized.' });
  }
};

const getPosts = async (req, res) => {
  const token = getToken(req.headers);
  console.log('TOKEN GET POSTS', token);
  if (token) {
    try {
      const posts = await Post.findAll();
      res.status(200).send({ sucess: true, posts });
    } catch (err) {
      console.log('err', err);
      res.status(400).send({ error: true, message: 'Something goes wrong...' });
    }
  } else {
    res.status(403).json({ success: false, message: 'qw Unauthorized.' });
  }
};

const changePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const post = await Post.update({ title, description }, { where: { id } });
    console.log('post', post);
    if (!post) {
      return res.status(404).send({ sucess: false, message: 'No post with this id' });
    }
    res.status(200).send({ sucess: true, post });
  } catch (err) {
    console.log('err', err);
    res.status(400).send({ error: true, message: 'Something goes wrong...' });
  }
};

module.exports = {
  getPostById,
  createPost,
  getPosts,
  changePost,
};
