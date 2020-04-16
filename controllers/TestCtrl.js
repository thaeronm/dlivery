'use strict'

//Helpers
const faker = require('faker');

//Models
const Combo    = require('../models/Combo');
const Delivery = require('../models/Delivery');
const Extra    = require('../models/Extra');
const Item     = require('../models/Item');
const Order    = require('../models/Order');
const Product  = require('../models/Product');
const Store    = require('../models/Store');
const User     = require('../models/User');

const TestCtrl = {};

TestCtrl.Create = async (req, res) => {
    
    for (let i = 0; i < 3; i++) {
        try {
            let store = new Store({
                tienda      : faker.company.companyName(),
                descripcion : faker.lorem.paragraph(),
            });
            await store.save();
        } catch (e) {
            console.log(e);
        }
    }   


    for (let i = 0; i < 3; i++) {
        try {
            let item = new Item({
                nombre: faker.commerce.productName(),
                precio: faker.commerce.price(),
                status: faker.random.boolean(),
            });
            await item.save();
        } catch (e) {
            console.log(e);
        }   
    }

    var NewItems = await Item.find({}).lean();

    for (let i = 0; i < 5; i++) {
        try {
            let extra = new Extra();
            extra.descripcion = faker.commerce.product();
            extra.items       = NewItems;
            extra.maximo      = faker.random.number(2);
            extra.minimo      = faker.random.number(1);
            extra.obligatorio = faker.random.boolean();
            extra.status      = faker.random.boolean();
            extra.titulo      = faker.commerce.productName();

            await extra.save();
        } catch (e) {
            console.log(e);
        }   
    }

    var Precios = [];

    for (let i = 0; i < 3; i++) {
        let precio = {
            descripcion : faker.lorem.paragraph(),
            precio      : faker.commerce.price(),
            titulo      : faker.commerce.productName(),
        }; 
        Precios.push(precio);
    }

    const NewExtras = await Extra.find({}).lean();
    const store = await Store.findOne({});

    for (let i = 0; i < 10; i++) {
        try {
            let product = new Product();
            product.descripcion = faker.lorem.paragraph();
            product.descuento   = faker.random.number(2);
            product.extras      = NewExtras;
            product.status      = faker.random.boolean();
            product.tienda      = store._id;
            product.titulo      = faker.commerce.product();
            product.precios     = Precios;
            await product.save();
        } catch (e) {
            console.log(e);
        }   
    }
    console.log('listo')
    return res.send('ok');
}

module.exports = TestCtrl;