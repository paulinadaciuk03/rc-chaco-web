const path = require('path')
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const util = require('util')

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")))

const PORT = 5000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "rc_database"
})

app.post('/registro', (req, res) => {
    sql = "INSERT INTO usuarios (`nombre`, `apellido`, `username`, `email`, `rol`) VALUES (?, ?, ? ,?, 'pendiente')"
    const values = [
        req.body.nombre,
        req.body.apellido,
        req.body.username,
        req.body.email,
    ]
    db.query(sql, values, (err, result) => {
        if(err) return res.json({message: 'error en el query' + err})
        return res.json({success: 'datos enviados'})
    })
})



app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
})