'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Assuming you have a Users model defined
        key: 'id',
      },
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Articles', // Assuming you have an Articles model defined
        key: 'id',
      },
    },
  }, {});

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Comment.belongsTo(models.Article, { foreignKey: 'articleId', onDelete: 'CASCADE' });
  };

  return Comment;
};
