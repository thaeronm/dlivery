'use strict'
const { Schema, model } = require("mongoose");

const ExtraSchema = new Schema({
    descripcion: String,
    items: [{type: Schema.ObjectId, ref: 'Item'}],
    maximo: Number,
    minimo: Number,
    obligatorio: Boolean,
    status: Boolean,
    titulo: String,
},{ 
    timestamps: { createdAt: 'created_at' }
});

module.exports = model("Extra", ExtraSchema);