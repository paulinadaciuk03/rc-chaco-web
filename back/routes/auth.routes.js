const express = require('express');
const router = express.Router();
const { registrarUsuario } = require('../controllers/auth.controller');

router.post('/registro', registrarUsuario);

module.exports = router;