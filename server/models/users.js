module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      uid: DataTypes.STRING,
      provider: DataTypes.STRING,
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {},
  );
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};
