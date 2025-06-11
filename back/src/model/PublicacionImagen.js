// models/PublicacionImagen.js
module.exports = (sequelize, DataTypes) => {
    const PublicacionImagen = sequelize.define('PublicacionImagen', {
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
      url_imagen: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    }, {
      tableName: 'publicacion_imagenes',
      timestamps: false
    });
  
    PublicacionImagen.associate = function(models) {
      PublicacionImagen.belongsTo(models.Publicacion, {
        foreignKey: 'publicacion_id',
        as: 'publicacion'
      });
    };
  
    return PublicacionImagen;
  };