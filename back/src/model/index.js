require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  }
});

// Modelos existentes
const Usuarios = require('./usuarios')(sequelize, DataTypes);
const Roles = require('./roles')(sequelize, DataTypes);
const Noticias = require('./noticias')(sequelize, DataTypes);
const NoticiaImagenes = require('./noticia_imagenes')(sequelize, DataTypes);
const Inscripciones = require('./inscripciones')(sequelize, DataTypes);
const ComentariosNoticias = require('./comentarios_noticias')(sequelize, DataTypes);

// Nuevos modelos de publicaciones
const Publicaciones = require('./Publicacion')(sequelize, DataTypes);
const PublicacionImagenes = require('./PublicacionImagen')(sequelize, DataTypes);
const ComentariosPublicaciones = require('./ComentarioPublicacion')(sequelize, DataTypes);

// Relaciones existentes
Usuarios.belongsTo(Roles, {
  foreignKey: "rol_id",
  as: "rol"
});

Roles.hasMany(Usuarios, {
  foreignKey: 'rol_id'
});

Noticias.hasMany(NoticiaImagenes, {
  foreignKey: 'noticia_id',
  as: 'imagenes',
  onDelete: "CASCADE",
  hooks: true,
});

Noticias.belongsTo(Usuarios, { 
  foreignKey: "admin_id", 
  as: "admin"
});

NoticiaImagenes.belongsTo(Noticias, {
  foreignKey: 'noticia_id',
  as: 'noticia',
  onDelete: "CASCADE",
});

Noticias.hasMany(ComentariosNoticias, { 
  foreignKey: 'noticia_id', 
  as: 'comentarios_noticias'
});

ComentariosNoticias.belongsTo(Noticias, {
  foreignKey: 'noticia_id'
});

Usuarios.hasMany(ComentariosNoticias, {
  foreignKey: 'usuario_id'
});

ComentariosNoticias.belongsTo(Usuarios, {
  foreignKey: 'usuario_id', 
  as: 'usuario'
});

// Nuevas relaciones para publicaciones
Publicaciones.belongsTo(Usuarios, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

Usuarios.hasMany(Publicaciones, {
  foreignKey: 'usuario_id',
  as: 'publicaciones'
});

Publicaciones.hasMany(PublicacionImagenes, {
  foreignKey: 'publicacion_id',
  as: 'imagenes',
  onDelete: "CASCADE",
  hooks: true
});

PublicacionImagenes.belongsTo(Publicaciones, {
  foreignKey: 'publicacion_id',
  as: 'publicacion',
  onDelete: "CASCADE"
});

Publicaciones.hasMany(ComentariosPublicaciones, {
  foreignKey: 'publicacion_id',
  as: 'comentarios'
});

ComentariosPublicaciones.belongsTo(Publicaciones, {
  foreignKey: 'publicacion_id',
  as: 'publicacion'
});

Usuarios.hasMany(ComentariosPublicaciones, {
  foreignKey: 'usuario_id',
  as: 'comentariosPublicaciones'
});

ComentariosPublicaciones.belongsTo(Usuarios, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

module.exports = {
  sequelize,
  Usuarios,
  Roles,
  Noticias,
  NoticiaImagenes,
  Inscripciones,
  ComentariosNoticias,
  Publicaciones,
  PublicacionImagenes,
  ComentariosPublicaciones
};