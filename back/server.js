const path = require('path')
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")))

const PORT = 5000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rc_database'
})

app.listen(PORT, () =>{
    console.log('listening');
})