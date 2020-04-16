'use strict'
const ProductProv = {};

const Product  = require('../models/Product');
const Extra  = require('../models/Extra');
const Item  = require('../models/Item');
const Store  = require('../models/Store');

ProductProv.Create = async (body, id) => {
    try {
        //Obtengo los extras del producto
        const {extras} = body;
        //Creo el arreglo que ira dentro del producto
        const NewExtras = [];
        //Recorro cada uno de sus extras
        extras.forEach( async (extra) => {
            //Obtengo los items de los extras
            const {items} = extra;
            //Creo el arreglo que ira dentro del extra
            const NewItems = [];
            //Recorro cada uno de los items
            items.forEach( async (item) => {
                //Guardo el item en la base de datos
                let NewItem = new Item(item);
                //Agrego el item creado al arreglo de items
                NewItems.push(NewItem);
                await NewItem.save();
            });
            //Guardo el extra en la base de datos
            let NewExtra = new Extra({
                descripcion: extra.descripcion,
                maximo     : extra.maximo,
                minimo     : extra.minimo,
                obligatorio: extra.obligatorio,
                status     : extra.status,
                titulo     : extra.titulo,
                items      : NewItems
            });
            //Agrego el extra creado al arreglo de extras
            NewExtras.push(NewExtra);
            await NewExtra.save();
        });
        //Creo el nuevo producto
        const NewProduct = new Product({
            descripcion: body.descripcion,
            descuento  : body.descuento,
            status     : body.status,
            titulo     : body.titulo,
            precios    : body.precios,
            tienda     : id,
            extras     : NewExtras,
        });
        await NewProduct.save();
        //Busco la tienda para actualizar el catalogo de sus productos
        await Store.findOneAndUpdate({_id: id},{productos: NewProduct});
        //retorno el producto
        return NewProduct;
    } catch (error) {
        return console.log(error);
    }
}

module.exports = ProductProv;