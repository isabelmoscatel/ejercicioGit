'use strict'

var express = require('express');

const { body } = require('express-validator');
var api = express.Router();

var middleware = require('../middleware/middleware')

var UsersController = require("../controllers/users");
var AuthController = require("../controllers/auth");

//login
api.post('/login',[
    body("email").not().isEmpty(),
    body("password").not().isEmpty(),
], AuthController.login_user);

api.post('/logout',middleware.userpotectUrl, AuthController.logout);
//usuarios

api.get('/user',middleware.userpotectUrl ,UsersController.userlist)

api.get('/user/:iduser', middleware.userpotectUrl ,UsersController.userSingular)

api.post('/user',middleware.userpotectUrl ,[
    body("iduser").not().isEmpty(),
    body("name").not().isEmpty(),
    body("apellido").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty()
] ,UsersController.createUser)

api.put('/user/:iduser',middleware.userpotectUrl ,[
    body("iduser").not().isEmpty(),
    body("name").not().isEmpty(),
    body("apellido").not().isEmpty(),
    body("edad").not().isEmpty()
], UsersController.updateUser)

api.delete('/user/:iduser', middleware.userpotectUrl , UsersController.deleteUser)

module.exports = api;

