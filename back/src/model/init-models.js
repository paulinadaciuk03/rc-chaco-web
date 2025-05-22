var DataTypes = require("sequelize").DataTypes;
var _inscripciones = require("./inscripciones");
var _noticia_imagenes = require("./noticia_imagenes");
var _noticias = require("./noticias");
var _roles = require("./roles");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var inscripciones = _inscripciones(sequelize, DataTypes);
  var noticia_imagenes = _noticia_imagenes(sequelize, DataTypes);
  var noticias = _noticias(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  noticia_imagenes.belongsTo(noticias, { as: "noticium", foreignKey: "noticia_id"});
  noticias.hasMany(noticia_imagenes, { as: "noticia_imagenes", foreignKey: "noticia_id"});
  usuarios.belongsTo(roles, { as: "rol", foreignKey: "rol_id"});
  roles.hasMany(usuarios, { as: "usuarios", foreignKey: "rol_id"});
  noticias.belongsTo(usuarios, { as: "admin", foreignKey: "admin_id"});
  usuarios.hasMany(noticias, { as: "noticia", foreignKey: "admin_id"});

  return {
    inscripciones,
    noticia_imagenes,
    noticias,
    roles,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
