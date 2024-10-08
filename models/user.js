'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
      User.hasMany(models.Article, { as: 'articles', foreignKey: 'userId' });

      // Many-to-many relationship through Likes table
      User.belongsToMany(models.Article, { 
        through: 'Likes', 
        foreignKey: 'userId',
        as: 'likedArticles'
      });
      
    }
  }
  
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
       
      },
    },
    aboutMe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    skills: {
      type: DataTypes.JSON, 
      allowNull: true,
      defaultValue: []
    },
    socialMedia: {
      type: DataTypes.JSON, 
      allowNull: true,
      defaultValue: []
    },
    jobTitle: { 
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    // Use camelCase for automatically added timestamp fields
    timestamps: true,
    underscored: false,
  });
  return User;
};
