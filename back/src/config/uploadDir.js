const path = require("path");

const uploadDir = process.env.UPLOADS_DIR || path.join(__dirname, "..", "uploads");

module.exports = uploadDir;
