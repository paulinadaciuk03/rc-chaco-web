// models/Publicacion.js
module.exports = (sequelize, DataTypes) => {
    const Publicacion = sequelize.define('Publicacion', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      fecha_publicacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      }
    }, {
      tableName: 'publicaciones',
      timestamps: false
    });
  
    Publicacion.associate = function(models) {
      Publicacion.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
      });
      Publicacion.hasMany(models.PublicacionImagen, {
        foreignKey: 'publicacion_id',
        as: 'imagenes'
      });
      Publicacion.hasMany(models.ComentarioPublicacion, {
        foreignKey: 'publicacion_id',
        as: 'comentarios'
      });
    };
  
    return Publicacion;
  };