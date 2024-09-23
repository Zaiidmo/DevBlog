'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PasswordResets extends Model {
    static associate(models) {
      // Define association here
      PasswordResets.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  PasswordResets.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, 
  {
    sequelize,
    modelName: 'PasswordResets',
    tableName: 'PasswordResets',
    timestamps: true,
    underscored: false,
    indexes: [
      { fields: ['email'] },
      { fields: ['token'] }
    ]
  });

  return PasswordResets;
};