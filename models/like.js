'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Like extends Model {
    static associate(models) {
      // Define associations here
      Like.belongsTo(models.User, { foreignKey: 'userId' });
      Like.belongsTo(models.Article, { foreignKey: 'articleId' });
    }
  }

  Like.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Like',
    tableName: 'Likes',
    timestamps: true, // Ensures createdAt and updatedAt are handled automatically
  });

  return Like;
};
