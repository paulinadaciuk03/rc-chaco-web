const express = require('express');
const UserRouter = require('../router/user.router');
const morgan = require('morgan');
const authRoute =require('../router/auth')


const cors = require('cors');
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/', (req,res) =>{
    res.send('hola')
});

app.use('/api/v1',UserRouter);
app.use('/api/v1', authRoute);

module.exports = app;