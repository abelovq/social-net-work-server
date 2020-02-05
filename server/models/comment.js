module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      user_id: DataTypes.INTEGER,
      message: DataTypes.TEXT,
      commentable_type: DataTypes.STRING,
      commentable_id: DataTypes.INTEGER,
    },
    { freezeTableName: true }
  );
  Comment.associate = function(models) {
    // associations can be defined here
    // Comment.belongsTo(models.Post, {
    //   foreignKey: 'user_id',
    // });
  };
  return Comment;
};
