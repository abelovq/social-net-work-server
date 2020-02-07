module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      // hierarchy: true
    }
  );
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    Post.hasMany(models.Comment, {
      foreignKey: 'commentable_id',
      as: 'comments',
      // constraint: false,
      scope: {
        commentable_type: 'Post',
      },
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return Post;
};
