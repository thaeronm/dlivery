'use strict'
// Models
const Product = require('../models/Product');
const Store = require('../models/Store');

const ProductCtrl = {};

ProductCtrl.Create = async (req, res) => {
   //Extraemos el contenido de la peticion
   const { tienda_id, producto } = req.body;
   try {
       //Creamos una instancia del objeto
       const NewProduct = new Product(producto);
       //Buscamos el documento padre para actualizar el arreglo
       let store = await Store.findById(tienda_id);
       //Validacion para el objeto padre
       if (!store) return res.status(404).send('Tienda no encontrado.');
       //Indexamos el nuevo id
       store.productos.push(NewProduct._id);
       //Guardamos las instancias
       await store.save();
       await NewProduct.save();
       return res.status(201).json({producto: NewProduct});
   } catch (error) {
       return res.status(500).send(error);
   }
}

ProductCtrl.Edit = async (req, res) => {
    //Extraemos el contenido de la peticion
    const id = req.params.id;
    const { producto } = req.body
    try {
        //Buscamos el objeto y lo actualizamos
        const UpProduct = await Product.findByIdAndUpdate(id, producto);
        //Validacion para el objeto
        if (!UpProduct) return res.status(404).send('Producto no encontrado.');
        //Retorno de la informacion
        return res.status(200).json({producto: UpProduct});
    } catch (error) {
        return res.status(500).json(error);
    }
}

ProductCtrl.Delete = async (req, res) => {
    //Extraemos el contenido de la peticion
    const id = req.params.id;
    try {
        //Buscamos el objeto y lo eliminamos
        const DelProduct = await Product.findByIdAndDelete(id);
        //Validacion para el objeto
        if (!DelProduct) return res.status(404).send('Producto no encontrado.');
        //Retorno de la informacion
        return res.status(200).json({producto: DelProduct});
    } catch (error) {
        return res.status(500).json(error);
    }
}

ProductCtrl.ListOfOneStore = async (req, res) => {
    //Extraemos el contenido de la peticion
    const id = req.params.id;
    try {
        //Usamos el metodo porpulate para traernos todos los datos anidados
        const productos = await Store.findById(id).populate({
            path: 'productos',
            populate: { 
                path: 'extras' ,
                populate: { 
                    path: 'items' ,
                },
            },
        });
        //Validacion para el objeto
        if (!productos) return res.status(404).send('Tienda no encontrada.');
        //Retorno de la informacion
        return res.status(200).json(productos);
    } catch (error) {
        return res.status(500).json(error);
    }
}

ProductCtrl.ListOfManyStore = async (req, res) => {
    try {
        //Usamos el metodo porpulate para traernos todos los datos anidados
        const productos = await Product.find().populate({
            path: 'extras',
            populate: { 
                path: 'items' ,
            },
        }).populate('tienda');
        //Validacion para el objeto
        if (!productos) return res.status(404).send('No hay productos creados.');
        //Retorno de la informacion
        return res.status(200).json(productos);
    } catch (error) {
        return res.status(500).json(error);
    }
}

ProductCtrl.SearchForParams = async (req, res) => {
    //Extraemos el contenido de la peticion
    const { titulo, descripcion } = req.body;
    //Validacion que venga al menos un parametro
    if (!titulo && !descripcion) return res.status(403).send('Debe enviar los parametros a buscar.');
    //Realizamos la busqueda
    const producto = await Product.find({
        $or:[
            { "titulo": { $regex: '.*' + titulo + '.*' }}, { "descripcion": { $regex: '.*' + descripcion + '.*' }}
        ]
    });
    if (!producto) return res.status(404).send('No existe alguna coincidencia en nuestros productos.');
    return res.status(200).json(producto);
}

ProductCtrl.SearchForId = async (req, res) => {
    //Extraemos el contenido de la peticion
    const id = req.params.id;
    //Usamos el metodo porpulate para traernos todos los datos anidados
    const producto = await Product.findById(id)
        .populate({
            path: 'extras',
            populate: { 
                path: 'items' 
            },
        }).populate('tienda');
    //Validacion para el objeto padre
    if (!producto) return res.status(404).send('Producto no encontrado.');
    //Retorno de la informacion
    return res.status(200).json(producto);
}


module.exports = ProductCtrl;