// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('rc_database', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Usuarios = require('./usuarios')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Usuarios,
};
