const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../config/jwt');

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

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE email = ?';

    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                rol: user.rol
            },
            secret,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login exitoso',
            token,
            user: {
                id: user.id,
                username: user.username,
                rol: user.rol
            }
        });
    });
};

const asignarPassword = async (req, res) => {

}

module.exports = {
    registrarUsuario,
    loginUsuario,
    asignarPassword
};