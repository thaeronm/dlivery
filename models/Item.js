'use strict'
const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({
    nombre: String,
    precio: Number,
    status: Boolean,
},{ 
    timestamps: { createdAt: 'created_at' }
});

module.exports = model("Item", ItemSchema);