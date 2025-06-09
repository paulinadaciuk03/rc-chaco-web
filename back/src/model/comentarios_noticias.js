module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comentarios', {  // El nombre de la tabla según el tableName
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    noticia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'noticias',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
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
    ],
  });
};
