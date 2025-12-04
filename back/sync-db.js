const db = require('./models');

(async () => {
  try {
    // force: true borra las tablas existentes y las vuelve a crear
    await db.sequelize.sync({ force: true });
    console.log('✅ Tablas creadas/migradas correctamente en la DB local');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creando las tablas:', err);
    process.exit(1);
  }
})();