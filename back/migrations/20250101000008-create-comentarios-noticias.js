"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comentarios", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      noticia_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "noticias",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      texto: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fecha_creacion: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("comentarios");
  },
};
