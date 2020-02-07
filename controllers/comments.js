const { Op } = require('sequelize');

const { Comment, Post, User } = require('../server/models');

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
    const comments = await Comment.findAll({ include: [{ model: Post, as: 'posts', nested: true }] });

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

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.destroy({ where: { id } });
    const deletedComments = await Comment.findAll({ where: { postId: id } });
    for (const comment of deletedComments) {
      comment.destroy();
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
