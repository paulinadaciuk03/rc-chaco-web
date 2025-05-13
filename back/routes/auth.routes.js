const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario, asignarPassword } = require('../controllers/auth.controller');

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.post('/asignar_password', asignarPassword);

module.exports = router;