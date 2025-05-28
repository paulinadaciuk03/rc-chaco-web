// models/index.js
const { Sequelize, DataTypes, REAL } = require('sequelize');
const sequelize = new Sequelize('rc_database', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Usuarios = require('./usuarios')(sequelize, DataTypes);
const Roles = require('./roles')(sequelize, DataTypes);

Usuarios.belongsTo(Roles, {
  foreignKey: "rol_id",
  as: "rol"
})

Roles.hasMany(Usuarios, {
  foreignKey: 'rol_id'
})

module.exports = {
  sequelize,
  Usuarios,
  Roles
};
