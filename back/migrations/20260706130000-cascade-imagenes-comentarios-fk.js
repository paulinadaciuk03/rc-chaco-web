"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE comentarios_publicacion
        DROP CONSTRAINT comentarios_publicacion_publicacion_id_fkey,
        ADD CONSTRAINT comentarios_publicacion_publicacion_id_fkey
          FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id)
          ON UPDATE CASCADE ON DELETE CASCADE;
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE noticia_imagenes
        DROP CONSTRAINT noticia_imagenes_noticia_id_fkey,
        ADD CONSTRAINT noticia_imagenes_noticia_id_fkey
          FOREIGN KEY (noticia_id) REFERENCES noticias(id)
          ON UPDATE CASCADE ON DELETE CASCADE;
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE publicacion_imagenes
        DROP CONSTRAINT publicacion_imagenes_publicacion_id_fkey,
        ADD CONSTRAINT publicacion_imagenes_publicacion_id_fkey
          FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id)
          ON UPDATE CASCADE ON DELETE CASCADE;
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE comentarios_publicacion
        DROP CONSTRAINT comentarios_publicacion_publicacion_id_fkey,
        ADD CONSTRAINT comentarios_publicacion_publicacion_id_fkey
          FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id)
          ON UPDATE CASCADE ON DELETE RESTRICT;
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE noticia_imagenes
        DROP CONSTRAINT noticia_imagenes_noticia_id_fkey,
        ADD CONSTRAINT noticia_imagenes_noticia_id_fkey
          FOREIGN KEY (noticia_id) REFERENCES noticias(id)
          ON UPDATE CASCADE ON DELETE RESTRICT;
    `);
    await queryInterface.sequelize.query(`
      ALTER TABLE publicacion_imagenes
        DROP CONSTRAINT publicacion_imagenes_publicacion_id_fkey,
        ADD CONSTRAINT publicacion_imagenes_publicacion_id_fkey
          FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id)
          ON UPDATE CASCADE ON DELETE RESTRICT;
    `);
  },
};
