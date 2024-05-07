'use stric'

var jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


var Users = require("../models/users");
var Sessions = require("../models/accessToken");
const accessToken = require('../models/accessToken');

var controller = {
    login_user: function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ status: 400, errors: errors.array() })
        }

        var data = req.body;

        Users.findOne({ email: data.email })
            .then(usuarios => {
                // Load hash from your password DB.
                bcrypt.compare(data.password, usuarios.password, function (err, result) {
                    if (result) {

                        const privateKey = process.env.KEY;
                        const payload = {
                            user: usuarios
                        }
                        console.log(payload);

                        let access_token = jwt.sign(payload, privateKey, {
                            expiresIn: '1d'
                        });

                        let today = new Date().toDateString();
                        let update_session = {
                            user: usuarios.email,
                            key: access_token,
                            creationDaate: today,
                            expirationDate: '1d',
                            active: true,
                        }
                        Sessions.findOneAndUpdate({ user: usuarios.email }, update_session, { upsert: true, new: true })
                            .then(session => {

                                if (!session) {
                                    return res.status(401).send({
                                        status: 401,
                                        mensaje: "Usuario no encontrado",
                                    })
                                }
                                return res.status(200).send({
                                    status: 200,
                                    mensaje: "Log in correcto",
                                    token: access_token
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
                    } else {
                        return res.status(401).send({
                            status: 401,
                            mensaje: "Datos no válidos",
                        });
                    }
                });
            })
            .catch(error => {
                console.log(error)
                return res.status(401).send({
                    status: 401,
                    mensaje: "Usuario o contraseña incorrecta",
                })
            });
    },

    logout: function (req, res) {
        console.log(req.decoded);
        const token = req.headers['x-curso2024-access-token'];
        Sessions.findOneAndDelete({ user: req.decoded.user.email, key: token })
            .then(usuarios => {

                if (!usuarios) {
                    return res.status(200).send({
                        status: 200,
                        mensaje: "token invalido",
                    })
                }


                console.log(usuarios)
                return res.status(200).send({
                    status: 200,
                    mensaje: "sesion finalizada",
                })
            })
            .catch(error => {
                console.log(error)
                return res.status(500).send({
                    status: 500,
                    mensaje: "token invalido",
                })
            });
    }

}

module.exports = controller;