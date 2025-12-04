"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inscripciones", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      telefono: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      fecha_inscripcion: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Pendiente",
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("inscripciones");
  },
};
