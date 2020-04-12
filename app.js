'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var app = express();

//cargar archivos rutas
var project_routes = require('./routes');

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(expressSession({secret: 'dlivery-secret-key'}));
app.use(passport.initialize());
app.use(passport.session());

//rutas
app.use('/api', project_routes);

// exportar
module.exports = app;
