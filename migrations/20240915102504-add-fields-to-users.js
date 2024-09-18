'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'skills', {
      type: Sequelize.JSON, 
      allowNull: true,
      defaultValue: []
    });

    await queryInterface.addColumn('Users', 'aboutMe', {
      type: Sequelize.TEXT, 
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'socialMedia', {
      type: Sequelize.JSON, 
      allowNull: true,
      defaultValue: []
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'skills');
    await queryInterface.removeColumn('Users', 'aboutMe');
    await queryInterface.removeColumn('Users', 'socialMedia');
  }
};
