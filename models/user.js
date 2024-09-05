'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here, for example:
      // User.hasMany(models.Post, { foreignKey: 'userId' });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensures unique usernames
        validate: {
          len: [3, 50], // Username must be between 3 and 50 characters
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensures unique email addresses
        validate: {
          isEmail: true, // Checks for valid email format
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100], // Password must be between 8 and 100 characters
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true, // Allows the avatar field to be nullable
        validate: {
          isUrl: true, // Ensures the avatar is a valid URL (if provided)
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users', // Explicitly set the table name to match the naming convention
      timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' timestamps
      underscored: true, // Changes camelCased columns to snake_case in the database
    }
  );

  return User;
};
