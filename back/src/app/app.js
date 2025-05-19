const express = require('express');
const router = require('../router/user.router');
const morgan = require('morgan');



const app = express();

app.use(morgan("dev"));

app.get('/', (req,res) =>{
    res.send('ola')
});

app.use('/api/v1',router)

module.exports = app;