module.exports = function(sequelize, DataTypes) {
    return sequelize.define('comentarios_noticias', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      noticia_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'noticias',
          key: 'id'
        }
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      texto: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.Sequelize.fn('current_timestamp'),
      },
    }, {
      tableName: 'comentarios',
      timestamps: false,
      indexes: [
        {
          name: 'fk_comentario_noticia',
          fields: ['noticia_id'],
        },
        {
          name: 'fk_comentario_usuario',
          fields: ['usuario_id'],
        }
      ]
    });
  };