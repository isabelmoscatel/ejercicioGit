'use strict'

const mongoose = require('mongoose');
var app = require('./app')
var port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://paulisa14:paulisa@cluster0.cj07r3z.mongodb.net/curso2024", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("conexión a la base de datos establecida con exito");
        var server = app.listen(port, () => {
            console.log("Servidor de ejemplo ejecutando en " + port)
        });

        server.timeout = 120000;
    })
    .catch(err => console.log(err))