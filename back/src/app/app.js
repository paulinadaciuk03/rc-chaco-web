const express = require('express');
const UserRouter = require('../router/user.router');
const morgan = require('morgan');
const AuthRoute =require('../router/auth');
const NoticiasRouter = require("../router/noticias.router");
const UploadRouter = require("../router/upload.router");
const path = require("path");
const InscripcionesRouter = require("../router/inscripciones.router");
const ComentariosNoticiasRouter= require("../router/comentarios.noticias.router");
const uploadDir = path.join(__dirname, '..', 'uploads');
require('dotenv').config();

const cors = require('cors');
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/', (req,res) =>{
    res.send('hola')
});

app.use('/uploads', express.static(uploadDir));

app.use('/api/v1',UserRouter);
app.use('/api/v1', AuthRoute);
app.use('/api/v1/noticias', NoticiasRouter);
app.use('/api/v1/uploads', UploadRouter);
app.use('/api/v1/inscripciones',  InscripcionesRouter);
app.use('/api/v1/comentarios-noticias', ComentariosNoticiasRouter);


module.exports = app;