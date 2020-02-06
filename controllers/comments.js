const { Op } = require('sequelize');

const { Comment } = require('../server/models');

const { handleValidation } = require('../utils');

const createComment = async (req, res) => {
  if (handleValidation(req, res)) {
    try {
      const { id } = req.params;
      const { commentable_type, commentable_id, message } = req.body;
      const comment = await Comment.create({
        commentable_type,
        commentable_id,
        message,
        user_id: req.user.id,
        postId: id,
      });
      res.status(201).send({ comment });
    } catch (err) {
      console.log('err', err);
      res.status(400).send({ error: true, message: 'Something goes wrong...' });
    }
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).send({ success: true, comments });
  } catch (err) {
    console.log('err', err);
    res.status(400).send({ error: true, message: 'Something goes wrong...' });
  }
};

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findOne({ where: { id } });
    res.status(200).send({ comment });
  } catch (err) {
    console.log('err', err);
    res.status(400).send({ error: true, message: 'Something goes wrong...' });
  }
};

const changeCommentById = async (req, res) => {
  if (handleValidation(req, res)) {
    try {
      const { id } = req.params;
      const { message } = req.body;
      const target = await Comment.findOne({ where: { id } });
      const comment = await target.update({ message });
      if (!comment) {
        return res
          .status(404)
          .send({ sucess: false, message: 'No post with this id' });
      }
      res.status(200).send({ sucess: true, comment });
    } catch (err) {
      console.log('err', err);
      res.status(400).send({ error: true, message: 'Something goes wrong...' });
    }
  }
};

const getCommentsForPost = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.findAll({
      where: {
        [Op.and]: [{ commentable_id: id }, { commentable_type: 'Post' }],
      },
    });
    // if (!comments) {
    //   return res
    //     .status(404)
    //     .send({ sucess: false, message: 'No post with this id' });
    // }
    res.status(200).send({ sucess: true, comments });
  } catch (err) {
    console.log('err', err);
    res.status(400).send({ error: true, message: 'Something goes wrong...' });
  }
};

const getCommentsForComment = async (req, res) => {
  try {
    const { id } = req.params;
    const commentsForComment = await Comment.findAll({
      where: {
        [Op.and]: [{ commentable_id: id }, { commentable_type: 'Comment' }],
      },
    });
    res.status(200).send({ sucess: true, commentsForComment });
  } catch (err) {
    console.log('err', err);
    res.status(400).send({ error: true, message: 'Something goes wrong...' });
  }
};

const test = async (req, res) => {
  try {
    const insatnce = new Comment({ commentable_type: 'Post' });
    console.log('insatnce', insatnce.getCommentable('asd'));
  } catch (err) {
    console.log('err', err);
    res.status(400).send({ error: true, message: 'Something goes wrong...' });
  }
};

module.exports = {
  createComment,
  getComments,
  getCommentById,
  changeCommentById,
  getCommentsForPost,
  getCommentsForComment,
  test,
};
