'use strict'
// Providers
const ProductProv = require('../providers/ProductProv');
const Product  = require('../models/Product');

const ProductCtrl = {};

ProductCtrl.Create = async () => {

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
            }
        });

    return res.json(productos);
}


module.exports = ProductCtrl;