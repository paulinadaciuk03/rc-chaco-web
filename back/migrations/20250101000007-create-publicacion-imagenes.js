"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("publicacion_imagenes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      publicacion_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "publicaciones",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      url_imagen: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("publicacion_imagenes");
  },
};
