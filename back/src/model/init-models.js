var DataTypes = require("sequelize").DataTypes;
var _inscripciones = require("./inscripciones");
var _noticia_imagenes = require("./noticia_imagenes");
var _noticias = require("./noticias");
var _roles = require("./roles");
var _usuarios = require("./usuarios");
var _comentarios_noticias = require("./comentarios_noticias");
var _Publicacion = require("./Publicacion");
var _PublicacionImagen = require("./PublicacionImagen");
var _ComentarioPublicacion = require("./ComentarioPublicacion");

function initModels(sequelize) {
  var inscripciones = _inscripciones(sequelize, DataTypes);
  var noticia_imagenes = _noticia_imagenes(sequelize, DataTypes);
  var noticias = _noticias(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var comentarios_noticias = _comentarios_noticias(sequelize, DataTypes);
  var Publicacion = _Publicacion(sequelize, DataTypes);
  var PublicacionImagen = _PublicacionImagen(sequelize, DataTypes);
  var ComentarioPublicacion = _ComentarioPublicacion(sequelize, DataTypes);

  noticia_imagenes.belongsTo(noticias, { as: "noticium", foreignKey: "noticia_id"});
  noticias.hasMany(noticia_imagenes, { as: "noticia_imagenes", foreignKey: "noticia_id"});
  usuarios.belongsTo(roles, { as: "rol", foreignKey: "rol_id"});
  roles.hasMany(usuarios, { as: "usuarios", foreignKey: "rol_id"});
  noticias.belongsTo(usuarios, { as: "admin", foreignKey: "admin_id"});
  usuarios.hasMany(noticias, { as: "noticia", foreignKey: "admin_id"});
  noticias.hasMany(comentarios_noticias, { foreignKey: 'noticia_id', as: 'comentarios_noticias' });
  comentarios_noticias.belongsTo(noticias, { foreignKey: 'noticia_id' });
  usuarios.hasMany(comentarios_noticias, { foreignKey: 'usuario_id' });
  comentarios_noticias.belongsTo(usuarios, { foreignKey: 'usuario_id', as: 'usuario' });

  Publicacion.belongsTo(usuarios, { 
    as: "usuario", 
    foreignKey: "usuario_id" 
  });
  
  usuarios.hasMany(Publicacion, { 
    as: "publicaciones", 
    foreignKey: "usuario_id" 
  });

  PublicacionImagen.belongsTo(Publicacion, { 
    as: "publicacion", 
    foreignKey: "publicacion_id" 
  });
  
  Publicacion.hasMany(PublicacionImagen, { 
    as: "imagenes", 
    foreignKey: "publicacion_id" 
  });

  ComentarioPublicacion.belongsTo(Publicacion, { 
    as: "publicacion", 
    foreignKey: "publicacion_id" 
  });
  
  Publicacion.hasMany(ComentarioPublicacion, { 
    as: "comentarios", 
    foreignKey: "publicacion_id" 
  });

  ComentarioPublicacion.belongsTo(usuarios, { 
    as: "usuario", 
    foreignKey: "usuario_id" 
  });
  
  usuarios.hasMany(ComentarioPublicacion, { 
    as: "comentariosPublicaciones", 
    foreignKey: "usuario_id" 
  });

  return {
    inscripciones,
    noticia_imagenes,
    noticias,
    roles,
    usuarios,
    comentarios_noticias,
    Publicacion,
    PublicacionImagen,
    ComentarioPublicacion,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;