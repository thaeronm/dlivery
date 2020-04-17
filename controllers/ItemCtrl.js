'use strict'
//Model
const Extra = require('../models/Extra');
const Item = require('../models/Item');   

const ItemCtrl = {};

ItemCtrl.List = async (req, res) => {
    //Buscamos lo extras con desde el ultimo creado
    const items = await Item.find().sort('-created_at').lean();
    if (items.length > 0) {
        //Retornamos los extras
        return res.status(202).json(items);
    } else {
        //Retornamos un mensaje
        return res.status(404).send('No hay items registrados.');
    } 
}

ItemCtrl.Create = async (req, res) => {
    //Extraemos el contenido de la peticion
    const { extra_id, item } = req.body;
    try {
        //Creamos una instancia del objeto
        const NewItem = new Item(item);
        //Buscamos el documento padre para actualizar el arreglo
        let extra = await Extra.findById(extra_id);
        //Validacion para el objeto padre
        if (!extra) return res.status(404).send('Extra no encontrado.');
        //Indexamos el nuevo id
        extra.items.push(NewItem._id);
        //Guardamos las instancias
        await extra.save();
        await NewItem.save();
        return res.status(201).json({item: NewItem});
    } catch (error) {
        return res.status(500).json(error);
    }
}

ItemCtrl.Edit = async (req, res) => {
    //Extraemos el contenido de la peticion
    const id = req.params.id;
    const { item } = req.body
    try {
        //Buscamos el objeto y lo actualizamos
        const UpItem = await Item.findByIdAndUpdate(id, item).lean();
         //Validacion para el objeto
         if (!UpItem) return res.status(404).send('Item no encontrado.');
         //Retorno de la informacion
        return res.status(200).json({item: UpItem});
    } catch (error) {
        return res.status(500).json(error);
    }
}

ItemCtrl.Delete = async (req, res) => {
    //Extraemos el contenido de la peticion
    const id = req.params.id;
    try {
         //Buscamos el objeto y lo eliminamos
        const DelItem = await Item.findByIdAndDelete(id).lean();
        //Validacion para el objeto
        if (!DelItem) return res.status(404).send('Item no encontrado.');
        //Retorno de la informacion
        return res.status(200).json({item: DelItem});
    } catch (error) {
        return res.status(500).json(error);
    }
}

ItemCtrl.SearchForId = async (req, res) => {
    //Extraemos el contenido de la peticion
    const id = req.params.id;
    try {
        //Buscamos el objeto
        const item = await Item.findById(id).lean();
        //Validacion para el objeto
        if (!item) return res.status(404).send('Item no encontrado.');
        //Retorno de la informacion
        return res.status(201).json({item});
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = ItemCtrl;