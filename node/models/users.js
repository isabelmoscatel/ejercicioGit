'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    iduser: Number,
    name: String,
    apellido: String,
    edad: Number,
    email: String,
    password: String,
    grupos: Array,
    materias: Array

});

module.exports = mongoose.model('usuarios',UserSchema)