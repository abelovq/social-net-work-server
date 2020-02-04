module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      user_id: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {},
  );
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};
