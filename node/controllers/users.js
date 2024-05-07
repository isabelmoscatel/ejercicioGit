'use strict'

require('dotenv').config();
var jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


var Users = require("../models/users")

var controller = {

    userlist: function (req, res) {
        Users.find({})
            .then(usuarios => {
                console.log(usuarios)
                return res.status(200).send({
                    status: 200,
                    mensaje: "Usuarios listados",
                    data: usuarios
                })
            })
            .catch(error => {
                console.log(error)
                return res.status(500).send({
                    status: 500,
                    mensaje: "Error detectado",
                    data: usuarios
                })
            });

    },
    createUser: function (req, res) {

        //middleware
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ status: 400, errors: errors.array() })
        }

        var data = req.body;

        //Validacion de usuaruarios duplicados
        Users.findOne({ iduser: data.iduser })
            .then(usuarios => {
                console.log(usuarios)
                if (usuarios) {
                    return res.status(400).send({
                        status: 400,
                        mensaje: "usuario existente",
                    });
                }

                Users.findOne({ email: data.email })
                    .then(usuarios => {
                        console.log(usuarios)
                        if (usuarios) {
                            return res.status(400).send({
                                status: 400,
                                mensaje: "email existente",
                            });
                        }

                        //Crypt password
                        const saltRounds = 10;
                        bcrypt.genSalt(saltRounds, function (err, salt) {
                            bcrypt.hash(data.password, salt, function (err, hash) {

                                var create_user = new Users();
                                create_user.iduser = data.iduser;
                                create_user.name = data.name;
                                create_user.edad = data.edad;
                                create_user.email = data.email;
                                create_user.apellido = data.apellido;
                                create_user.grupos = data.grupos;
                                create_user.materias = data.materias;
                                create_user.password = hash;
                                create_user.save()
                                    .then(result => {
                                        return res.status(200).send({
                                            status: 200,
                                            mensaje: "Usuario almacenado",
                                            data: result
                                        })
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        return res.status(500).send({
                                            status: 500,
                                            mensaje: "Error detectado",
                                            data: result
                                        })
                                    });
                            });
                        });



                    }).catch(error => {
                        console.log(error)
                        return res.status(500).send({
                            status: 500,
                            mensaje: "Error detectado",
                        })
                    });


            })
            .catch(error => {
                console.log(error)
                return res.status(500).send({
                    status: 500,
                    mensaje: "Error detectado",
                })
            });




    },

    userSingular: function (req, res) {
        var params = req.params;
        var iduser = params.iduser
        console.log(req);
        Users.findOne({ iduser: parseInt(iduser) })
            .then(usuarios => {
                console.log(usuarios)
                return res.status(200).send({
                    status: 200,
                    mensaje: "Información de usuario",
                    data: usuarios
                })
            })
            .catch(error => {
                console.log(error)
                return res.status(500).send({
                    status: 200,
                    mensaje: "Error detectado",
                    data: usuarios
                })
            });
    },

    updateUser: function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ status: 400, errors: errors.array() })
        }

        var params = req.params;
        var iduser = params.iduser

        var data = req.body;

        //Crypt password
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(data.password, salt, function (err, hash) {

                var updateUser = {
                    iuser: data.iduser,
                    name: data.name,
                    edad: data.edad,
                    email: data.email,
                    password: hash,
                    apellido: data.apellido,
                    grupos: data.grupos,
                    materias: data.materias

                }
                Users.findOneAndUpdate({ iduser: parseInt(iduser) }, updateUser)
                    .then(usuarios => {

                        if (!usuarios) {
                            return res.status(200).send({
                                status: 200,
                                mensaje: "Usuario no encontrado",
                                //data: usuarios
                            })
                        }
                        console.log(usuarios)
                        return res.status(200).send({
                            status: 200,
                            mensaje: "Usuario Actualizado",
                            //data: usuarios
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        return res.status(500).send({
                            status: 500,
                            mensaje: "Error detectado",
                            //data: usuarios
                        })
                    });
            });
        });




    },

    deleteUser: function (req, res) {
        var params = req.params;
        var iduser = params.iduser


        Users.findOneAndDelete({ iduser: parseInt(iduser) })
            .then(usuarios => {

                if (!usuarios) {
                    return res.status(200).send({
                        status: 200,
                        mensaje: "Usuario no encontrado",
                        //data: usuarios
                    })
                }


                console.log(usuarios)
                return res.status(200).send({
                    status: 200,
                    mensaje: "Usuario eliminado",
                    data: usuarios
                })
            })
            .catch(error => {
                console.log(error)
                return res.status(500).send({
                    status: 500,
                    mensaje: "Error detectado",
                    data: usuarios
                })
            });
    }

}

module.exports = controller;