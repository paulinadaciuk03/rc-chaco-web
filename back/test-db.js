require("dotenv").config();
const db = require("./models");

async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Conexión exitosa a Neon!");
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
  } finally {
    await db.sequelize.close();
  }
}

testConnection();
