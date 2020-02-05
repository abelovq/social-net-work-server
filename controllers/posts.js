const { Post } = require('../server/models');

const { getToken, handleValidation } = require('../utils');

const createPost = async (req, res) => {
  if (handleValidation(req, res)) {
    const { title, description } = req.body;
    try {
      const { id } = req.user;
      const post = await Post.create({
        title,
        description,
        user_id: id,
      });
      res.status(200).send(post);
    } catch (err) {
      console.log('err', err);
      res.status(400).send({ error: true, message: 'Something goes wrong...' });
    }
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id', id);
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res
        .status(404)
        .send({ sucess: false, message: 'No post with this id' });
    }
    res.status(200).send({ sucess: true, post });
  } catch (err) {
    console.log('err', err);
    res.status(400).send({ error: true, message: 'Something goes wrong...' });
  }
};

const getPosts = async (req, res) => {
  const token = getToken(req.headers);
  console.log('TOKEN GET POSTS', token);
  try {
    const posts = await Post.findAll();
    res.status(200).send({ sucess: true, posts });
  } catch (err) {
    console.log('err', err);
    res.status(400).send({ error: true, message: 'Something goes wrong...' });
  }
};

const changePost = async (req, res) => {
  if (handleValidation(req, res)) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const target = await Post.findOne({ where: { id } });
      const post = await target.update({ title, description });
      console.log('post', post);
      if (!post) {
        return res
          .status(404)
          .send({ sucess: false, message: 'No post with this id' });
      }
      res.status(200).send({ sucess: true, post });
    } catch (err) {
      console.log('err', err);
      res.status(400).send({ error: true, message: 'Something goes wrong...' });
    }
  }
};

const deletePost = async (req, res) => {
  if (handleValidation(req, res)) {
    try {
      const { id } = req.params;
      const deleted = await Post.destroy({ where: { id } });
      if (deleted === 1) {
        return res
          .status(200)
          .send({ success: true, message: 'Successfully deleted' });
      }
      res.status(404).send({ success: false, message: 'Record not found' });
    } catch (err) {
      console.log('err', err);
      res.status(400).send({ error: true, message: 'Something goes wrong...' });
    }
  }
};

module.exports = {
  getPostById,
  createPost,
  getPosts,
  changePost,
  deletePost,
};
