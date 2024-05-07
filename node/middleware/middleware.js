'use strict'
require('dotenv').config();
var jwt = require('jsonwebtoken');

var Sessions = require("../models/accessToken")

var middleware = {
    userpotectUrl: function (req, res, next) {

        const token = req.headers['x-curso2024-access-token'];

        if (token) {
            jwt.verify(token, process.env.KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).send({
                        status: 401,
                        mensaje: "Token no válido",
                    });
                } else {

                    req.decoded = decoded;

                    Sessions.findOne({ user: req.decoded.user.email, key:token, active: true })
                        .then(session => {
                            if (!session) {
                                return res.status(401).send({
                                    status: 401,
                                    mensaje: "Sesion no encontrada",
                                })
                            }
                            next();
                        })
                        .catch(error => {
                            console.log(error)
                            return res.status(500).send({
                                status: 200,
                                mensaje: "Error detectado",
                                data: usuarios
                            })
                        });

                   
                }
            });


        } else {
            return res.status(401).send({
                status: 401,
                mensaje: "Token no válido",
            });
        }


    }
}

module.exports = middleware;