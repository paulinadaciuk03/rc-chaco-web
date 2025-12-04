'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      rol: {
        type: Sequelize.STRING(20),
        allowNull: false
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('roles');
  }
};
