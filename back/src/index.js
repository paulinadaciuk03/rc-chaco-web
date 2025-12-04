const app = require("./app/app");
require("dotenv").config();
const port = process.env.PORT || 10000;

const db = require("../models");

db.sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Conexión establecida correctamente.");
  })
  .catch((err) => {
    console.error("❌ Error al conectar a la base de datos:", err);
  });

app.listen(port, () => {
  console.log(`server andando en puerto ${port}`);
});
