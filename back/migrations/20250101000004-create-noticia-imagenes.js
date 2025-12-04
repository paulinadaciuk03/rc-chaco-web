"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("noticia_imagenes", {
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
      url_imagen: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("noticia_imagenes");
  },
};
