"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("noticias", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fecha_publicacion: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("noticias");
  },
};
