'use strict'
var mongoose = require('mongoose');
var app = require('./app');
app.set('port', process.env.PORT || 3000);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dlivery', { useNewUrlParser: true })
    .then(()=>{
        console.log("Conexion establecida");

        // Creacion del servidor
        app.listen(port, () => {
            console.log("Servidor corriendo en la url: localhost:3700");
        });
    })
    .catch(err => console.log(err));