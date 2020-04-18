'use strict'
//Express
const express = require('express');
const router = express.Router();

// Helper de autenticacion
const Auth = require("../middleware/auth");

// Controladores
var AuthCtrl     = require('../controllers/AuthCtrl');
// var ComboCtrl    = require('../controllers/ComboCtrl');
// var DeliveryCtrl = require('../controllers/DeliveryCtrl');
// var OrderCtrl    = require('../controllers/OrderCtrl');
var ProductCtrl  = require('../controllers/ProductCtrl');
var ExtraCtrl  = require('../controllers/ExtraCtrl');
var ItemCtrl  = require('../controllers/ItemCtrl');
// var StoreCtrl    = require('../controllers/StoreCtrl');
// var UserCtrl     = require('../controllers/UserCtrl');
var TestCtrl     = require('../controllers/TestCtrl');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/',(res) => { res.send('Dlivery')});

// Ruta de autenticación
router.post('/register', AuthCtrl.Register);
router.post('/login', AuthCtrl.Login);
router.get('/user', Auth, AuthCtrl.User);


// Ruta de Productos
router.get('/product/search/:id', ProductCtrl.SearchForId);
router.post('/product/create', ProductCtrl.Create);
router.put('/product/edit/:id', ProductCtrl.Edit);
router.delete('/product/delete/:id', ProductCtrl.Delete);
router.get('/product/store/:id', ProductCtrl.ListOfOneStore);
router.get('/product/stores/list', ProductCtrl.ListOfManyStore);
router.post('/product/params', ProductCtrl.SearchForParams);

// Ruta para Extras
router.get('/extras', ExtraCtrl.List);
router.post('/extras/create', ExtraCtrl.Create);
router.put('/extras/edit/:id', ExtraCtrl.Edit);
router.delete('/extras/delete/:id', ExtraCtrl.Delete);
router.get('/extras/search/:id', ExtraCtrl.SearchForId);

//Ruta para Item
router.get('/items', ItemCtrl.List);
router.post('/items/create', ItemCtrl.Create);
router.put('/items/edit/:id', ItemCtrl.Edit);
router.delete('/items/delete/:id', ItemCtrl.Delete);
router.get('/items/search/:id', ItemCtrl.SearchForId);


router.get('/test', TestCtrl.Create);


module.exports = router;