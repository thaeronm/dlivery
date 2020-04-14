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
var ProductCtrl  = require('../controllers/ProductCtrl');
// var StoreCtrl    = require('../controllers/StoreCtrl');
// var UserCtrl     = require('../controllers/UserCtrl');
var TestCtrl     = require('../controllers/TestCtrl');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/',(res) => { res.send('Dlivery')});

// Ruta de autenticación
router.post('/register', AuthCtrl.Register);
router.post('/login', AuthCtrl.Login);
router.get('/user', auth, AuthCtrl.User);


// Ruta de Productos
router.get('/product/search/', ProductCtrl.SearchForId);
// router.post('/product/create', ProductCtrl.Create);
// router.put('/product/edit/:id', ProductCtrl.Edit);
// router.delete('/product/delete/:id', ProductCtrl.Delete);
// router.get('/product/store/:id', ProductCtrl.ListOfOneStore);
// router.get('/product/stores/list/:id', ProductCtrl.ListOfManyStore);
// router.get('/product/search/:name', ProductCtrl.SearchForParams);


router.get('/test', TestCtrl.Create);


module.exports = router;