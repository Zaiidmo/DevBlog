'use strict';

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // References the 'Users' table
        key: 'id',
      },
    },
  }, {
    tableName: 'Articles',
    timestamps: true, // Ensures createdAt and updatedAt fields are automatically managed
  });

  // Associations
  Article.associate = function(models) {
    Article.belongsTo(models.User, { 
      foreignKey: 'userId', 
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE'
    });
  };

  return Article;
};
