const { fa } = require('@faker-js/faker');
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('rc-database','root',null,{
    host: "localhost",
    dialect: "mysql",
    port: 3306
})

class User extends Model {}

User.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull:false,

    },
    }, {
    sequelize,
    createdAt: false,
    modelName: "User",
    updatedAt: false
});

module.exports = User;