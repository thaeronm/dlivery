'use strict'
// Providers
const ProductProv = require('../providers/ProductProv');
const Product  = require('../models/Product');

const ProductCtrl = {};

ProductCtrl.Create = async (req, res) => {
    const id       = req.params.id;
    const body     = req.body;
    const producto = await ProductProv.Create(body, id);
    return res.status(201).json(producto);
}

ProductCtrl.Edit = async () => {

}

ProductCtrl.Delete = async () => {

}

ProductCtrl.ListOfOneStore = async () => {

}

ProductCtrl.ListOfManyStore = async () => {

}

ProductCtrl.SearchForParams = async () => {

}

ProductCtrl.SearchForId = async (req, res) => {
    const productos = await Product.findOne({})
        .populate({
            path: 'extras',
            populate: { 
                path: 'items' 
            },
            path: 'tienda',
        });

    return res.json(productos);
}


module.exports = ProductCtrl;