'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // References the 'Users' table
        key: 'id',
      },
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Articles', // References the 'Articles' table
        key: 'id',
      },
    },
  }, {
    tableName: 'Comments',
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  });

  // Associations
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { 
      foreignKey: 'userId', 
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE',
    });
    Comment.belongsTo(models.Article, { 
      foreignKey: 'articleId', 
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE',
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // References the 'Users' table
        key: 'id',
      },
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Articles', // References the 'Articles' table
        key: 'id',
      },
    },
  }, {
    tableName: 'Comments',
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  });

  // Associations
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { 
      foreignKey: 'userId', 
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE',
    });
    Comment.belongsTo(models.Article, { 
      foreignKey: 'articleId', 
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE',
    });
  };

  return Comment;
};