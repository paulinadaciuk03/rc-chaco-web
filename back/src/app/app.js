const express = require('express');
const UserRouter = require('../router/user.router');
const morgan = require('morgan');
const AuthRoute =require('../router/auth');
const NoticiasRouter = require("../router/noticias.router");
const UploadRouter = require("../router/upload.router");
const InscripcionesRouter = require("../router/inscripciones.router");
const ComentariosNoticiasRouter= require("../router/comentarios.noticias.router");
const PublicacionesRouter = require("../router/publicacion.router");
const ComentariosPublicacioneRouter = require("../router/comentarios.publicaciones.router");
const uploadDir = require("../config/uploadDir");
require('dotenv').config();

const cors = require('cors');
const app = express();
app.use(morgan("dev"));
app.use(express.json());

const allowedOrigins = [
    'https://dazzling-dedication-production-c456.up.railway.app',
    'https://lu4gf.org.ar',
    'https://www.lu4gf.org.ar',
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
}));

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
app.use('/api/v1/publicaciones', PublicacionesRouter);
app.use('/api/v1/comentarios-publicaciones', ComentariosPublicacioneRouter);

module.exports = app;