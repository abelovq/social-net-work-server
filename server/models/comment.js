/* eslint-disable no-restricted-syntax */
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      user_id: DataTypes.INTEGER,
      message: DataTypes.TEXT,
      commentable_type: DataTypes.STRING,
      commentable_id: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      // hierarchy: true,
    }
  );
  Comment.isHierarchy();
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.Post, {
      foreignKey: 'commentable_id',

      constraints: false,
    });
    Comment.belongsTo(models.Comment, {
      foreignKey: 'commentable_id',
      targetKey: 'commentable_id',
      constraints: false,
    });
    Comment.hasMany(models.Comment, {
      foreignKey: 'commentable_id',
      sourceKey: 'commentable_id',
      constraints: false,
      scope: {
        commentable_type: 'Comment',
      },
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  Comment.prototype.getCommentable = function (options) {
    function transformString(str) {
      const newString = str
        .split('_')
        .map((el, i) => (i === 1 ? `${el[0].toUpperCase()}${el.slice(1)}` : el))
        .join('');
      return newString;
    }

    // console.log('newString', transformString('commentable_type'))

    if (!this.commentable_type) return Promise.resolve(null);
    const mixinMethodName = `get${transformString(this.commentable_type)}`;
    // console.log('mixinMethodName', mixinMethodName)
    return this[mixinMethodName](options);
  };

  Comment.addHook('afterFind', findResult => {
    if (!Array.isArray(findResult)) {
      findResult = [findResult];
    }
    console.log('hook !!!!!!!');
    for (const instance of findResult) {
      if (instance.commentable_type === 'Post' && instance.Post !== undefined) {
        instance.commentable = instance.Post;
      } else if (
        instance.commentable_type === 'Comment' &&
        instance.Comment !== undefined
      ) {
        instance.commentable = instance.Comment;
      }
      // To prevent mistakes:
      delete instance.Post;
      delete instance.dataValues.Post;
      delete instance.Comment;
      delete instance.dataValues.Comment;
    }
  });

  return Comment;
};
