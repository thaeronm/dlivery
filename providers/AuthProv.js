'use strict'
//Proveedor
const AuthProv = {};
// Modelos
const User = require('../models/User');


//Validar que no exita un correo igual
AuthProv.Email = async (body) => {
    return await User.findOne({ email: body.email }); 
}

AuthProv.Password = async (body) => {
    let {email, password} = body;
    let user = await User.findOne({ email: email }); 
    return user.matchPassword(password);
}

AuthProv.CreateUser = async (body) => {
    const {email, password} = body;
    let NewUser = new User ({email, password});
    NewUser.password = await NewUser.encryptPassword(password);
    try {
        await NewUser.save();
        return NewUser;
    } catch (e) {
        console.log(e);
    }
}

module.exports = AuthProv;