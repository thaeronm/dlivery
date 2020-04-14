'use strict'
const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    descripcion: String,
    descuento: Number,
    extras: [{type: Schema.ObjectId, ref: 'Extra'}],
    status: Boolean,
    tienda: {type: Schema.ObjectId, ref: 'Store'},
    titulo: String,
    precios: [{
        descripcion: String,
        precio: Number,
        titulo: String,
    }],
},{ 
    timestamps: { createdAt: 'created_at' }
});

module.exports = model("Product", ProductSchema);