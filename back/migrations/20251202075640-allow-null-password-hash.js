"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("usuarios", "password_hash", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Si quisieras revertirlo
    await queryInterface.changeColumn("usuarios", "password_hash", {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  },
};
