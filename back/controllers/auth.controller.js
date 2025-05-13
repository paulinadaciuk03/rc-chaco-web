const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('../config/jwt')

const registrarUsuario = (req, res) => {
    const sql = "INSERT INTO usuarios (`nombre`, `apellido`, `username`, `email`, `rol`) VALUES (?, ?, ?, ?, 'pendiente')";
    const values = [
        req.body.nombre,
        req.body.apellido,
        req.body.username,
        req.body.email,
    ];

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ message: 'Error en el query: ' + err });
        return res.json({ success: 'Datos enviados' });
    });
};

module.exports = {
    registrarUsuario
};