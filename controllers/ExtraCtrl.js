'use strict'
// Model
const Product  = require('../models/Product');
const Extra  = require('../models/Extra');

const ExtraCtrl = {};

ExtraCtrl.List = async (req, res) => {
    //Buscamos lo extras con desde el ultimo creado
    const extras = await Extra.find().sort('-created_at');
    if (extras.length > 0) {
        //Retornamos los extras
        return res.status(200).json(extras);
    } else {
        //Retornamos un mensaje
        return res.status(404).send('No hay extras registrados.');
    }
}

ExtraCtrl.Create = async (req, res) => {
    //Extraemos el contenido de la peticion
    const { product_id, extra } = req.body;
    try {
        //Creamos una instancia del objeto
        const NewExtra = new Extra(extra);
        //Buscamos el documento padre para actualizar el arreglo
        let product = await Product.findById(product_id);
        //Validacion para el objeto padre
        if (!product) return res.status(404).send('Producto no encontrado.');
        //Indexamos el nuevo id
        product.extras.push(NewExtra._id);
        //Guardamos las instancias
        await product.save();
        await NewExtra.save();
        return res.status(201).json({extra: NewExtra});
    } catch (error) {
        return res.status(500).send(error);
    }
}

ExtraCtrl.Edit = async (req, res) => {
    //Extraemos el contenido de la peticion
    const id = req.params.id;
    const { extra } = req.body
    try {
        //Buscamos el objeto y lo actualizamos
        const UpExtra = await Extra.findByIdAndUpdate(id, extra);
        //Validacion para el objeto
        if (!UpExtra) return res.status(404).send('Extra no encontrado.');
        //Retorno de la informacion
        return res.status(200).json({extra: UpExtra});
    } catch (error) {
        return res.status(500).json(error);
    }
}

ExtraCtrl.Delete = async (req, res) => {
    //Extraemos el contenido de la peticion
    const id = req.params.id;
    try {
        //Buscamos el objeto y lo eliminamos
        const DelExtra = await Extra.findByIdAndDelete(id);
        //Validacion para el objeto
        if (!DelExtra) return res.status(404).send('Extra no encontrado.');
        //Retorno de la informacion
        return res.status(200).json({extra: DelExtra});
    } catch (error) {
        return res.status(500).json(error);
    }
}

ExtraCtrl.SearchForId = async (req, res) => {
    //Extraemos el contenido de la peticion
    const id = req.params.id;
    try {
        //Buscamos el objeto
        const extra = await Extra.findById(id).populate('items');
        //Validacion para el objeto
        if (!extra) return res.status(404).send('Extra no encontrado.');
        //Retorno de la informacion
        return res.status(200).json({extra});
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = ExtraCtrl;