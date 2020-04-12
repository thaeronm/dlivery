'use strict'
//Express
const express = require('express');
const router = express.Router();

// Helper de autenticacion
const auth = require("../middleware/auth");

// Controladores
var AuthCtrl     = require('../controllers/AuthCtrl');
// var ComboCtrl    = require('../controllers/ComboCtrl');
// var DeliveryCtrl = require('../controllers/DeliveryCtrl');
// var OrderCtrl    = require('../controllers/OrderCtrl');
// var ProductCtrl  = require('../controllers/ProductCtrl');
// var StoreCtrl    = require('../controllers/StoreCtrl');
// var UserCtrl     = require('../controllers/UserCtrl');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

// Ruta de autenticación
router.post('/register', AuthCtrl.Register);
router.post('/login', AuthCtrl.Login);
router.get('/user', auth, AuthCtrl.User);

module.exports = router;