module.exports = (sequelize, DataTypes) => {
  return sequelize.define('usuarios', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue('email', value.toLowerCase());
      }
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'id'
      }
    }
  }, {
    tableName: 'usuarios',
    timestamps: false
  });
};
