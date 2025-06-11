// models/ComentarioPublicacion.js
module.exports = (sequelize, DataTypes) => {
    const ComentarioPublicacion = sequelize.define('ComentarioPublicacion', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      publicacion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Publicaciones',
          key: 'id'
        }
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
      texto: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'comentarios_publicacion',
      timestamps: false
    });
  
    ComentarioPublicacion.associate = function(models) {
      ComentarioPublicacion.belongsTo(models.Publicacion, {
        foreignKey: 'publicacion_id',
        as: 'publicacion'
      });
      ComentarioPublicacion.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
      });
    };
  
    return ComentarioPublicacion;
  };