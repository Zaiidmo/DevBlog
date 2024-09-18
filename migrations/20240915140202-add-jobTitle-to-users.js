'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'jobTitle', {
      type: Sequelize.STRING,
      allowNull: true, // Change to false if this field should be required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'jobTitle');
  }
};
