
const { Sequelize, DataTypes, REAL } = require('sequelize');
const sequelize = new Sequelize('rc_database', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Usuarios = require('./usuarios')(sequelize, DataTypes);
const Roles = require('./roles')(sequelize, DataTypes);
const Noticias = require('./noticias')(sequelize, DataTypes);
const NoticiaImagenes = require('./noticia_imagenes')(sequelize, DataTypes);
const Inscripciones = require('./inscripciones')(sequelize, DataTypes);
const ComentariosNoticias = require('./comentarios_noticias')(sequelize, DataTypes);


Usuarios.belongsTo(Roles, {
  foreignKey: "rol_id",
  as: "rol"
})

Roles.hasMany(Usuarios, {
  foreignKey: 'rol_id'
})

Noticias.hasMany(NoticiaImagenes, {
  foreignKey: 'noticia_id',
  as: 'imagenes',
  onDelete: "CASCADE",
  hooks: true,
})


Noticias.belongsTo(Usuarios, { foreignKey: "admin_id", as: "admin"});

NoticiaImagenes.belongsTo(Noticias, {
  foreignKey: 'noticia_id',
  as: 'noticia',
  onDelete: "CASCADE",
})



Noticias.hasMany(ComentariosNoticias, { foreignKey: 'noticia_id', as :'comentarios_noticias'});
ComentariosNoticias.belongsTo(Noticias, {foreignKey: 'noticia_id'});

Usuarios.hasMany(ComentariosNoticias, {foreignKey: 'usuario_id'});
ComentariosNoticias.belongsTo(Usuarios, {foreignKey: 'usuario_id', as: 'usuario'});


module.exports = {
  sequelize,
  Usuarios,
  Roles,
  Noticias,
  NoticiaImagenes,
  Inscripciones,
  ComentariosNoticias,
};
