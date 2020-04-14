'use strict'
const { Schema, model } = require("mongoose");

const StoreSchema = new Schema({
    tienda: String,
    descripcion: String,
},{ 
    timestamps: { createdAt: 'created_at' }
});

module.exports = model("Store", StoreSchema);