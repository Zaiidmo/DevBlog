'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('PasswordResets', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addIndex('PasswordResets', ['email']);
    await queryInterface.addIndex('PasswordResets', ['token']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('PasswordResets', 'userId');
    await queryInterface.removeIndex('PasswordResets', ['email']);
    await queryInterface.removeIndex('PasswordResets', ['token']);
  }
};