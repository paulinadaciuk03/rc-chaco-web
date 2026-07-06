"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE publicaciones
        DROP CONSTRAINT publicaciones_usuario_id_fkey,
        ADD CONSTRAINT publicaciones_usuario_id_fkey
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
          ON UPDATE CASCADE ON DELETE CASCADE;
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE comentarios_publicacion
        DROP CONSTRAINT comentarios_publicacion_usuario_id_fkey,
        ADD CONSTRAINT comentarios_publicacion_usuario_id_fkey
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
          ON UPDATE CASCADE ON DELETE CASCADE;
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE publicaciones
        DROP CONSTRAINT publicaciones_usuario_id_fkey,
        ADD CONSTRAINT publicaciones_usuario_id_fkey
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
          ON UPDATE CASCADE ON DELETE RESTRICT;
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE comentarios_publicacion
        DROP CONSTRAINT comentarios_publicacion_usuario_id_fkey,
        ADD CONSTRAINT comentarios_publicacion_usuario_id_fkey
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
          ON UPDATE CASCADE ON DELETE RESTRICT;
    `);
  },
};
