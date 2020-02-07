const { Post, Comment } = require('../server/models');

const { handleValidation } = require('../utils');

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
  try {
    const posts = await Post.findAll({ include: [{ model: Comment, as: 'comments' }] });
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
      const deletedPost = await Post.destroy({ where: { id } });
      const deletedComments = await Comment.findAll({ where: { postId: id }, hierarchy: true });
      for (const comment of deletedComments) {
        // while()
        // if (comment.commentable_type === 'Comment') {

        // }
        console.log('comment', comment);
        // comment.destroy();
      }
      // ask if i am delete post and re create it id shifts by posotin i.e. 
      // id delete post with id 1 then create post id will be 2 and i'll have to create comments with id 2 not 1
      if (deletedPost === 1) {
        return res
          .status(204)
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
