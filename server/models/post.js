module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      user_id: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    },
  );
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Post;
};
