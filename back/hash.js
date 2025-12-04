const bcrypt = require("bcrypt");

const password = process.argv[2];

if (!password) {
  console.log("Uso: node hash.js <password>");
  process.exit(1);
}

bcrypt
  .hash(password, 10)
  .then((hash) => {
    console.log("\n🔐 Contraseña hasheada:\n");
    console.log(hash);
    console.log("\nCópiala y pégala en tu base de datos.\n");
  })
  .catch((err) => console.error(err));
