const constraintName = 'post_post_service_id_fkey';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Post', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // .then(() =>
    //   queryInterface.sequelize
    //     .query(`alter table "Post" drop constraint "${constraintName}"`)
    // .then(() =>
    //   queryInterface.sequelize.query(
    //     `alter table "Post"
    //   add constraint "${constraintName}" foreign key("commentable_id") references "Сomment" ("id")
    //   on delete cascade`
    //   )
    // )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Post');
  },
};
