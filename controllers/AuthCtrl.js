'use strict'
// Providers
const AuthProv = require('../providers/AuthProv');
const JsonWebToken = require('../helpers/JsonWebToken');

const AuthCtrl = {}

AuthCtrl.Register = async (req, res) => {
    const body = req.body;
    const val = await AuthProv.Email(body);
    if (val !== null) return res.status(403).send('Email registrado!');
    const User = await AuthProv.CreateUser(body);
    const Token = await JsonWebToken.Sign(User);
    return res.status(201).json({User, Token});
};

AuthCtrl.Login = async (req, res) => {
    const body = req.body;
    const email = await AuthProv.Email(body);
    if (email === null) return res.status(403).send('Email incorrecto!');
    const password = await AuthProv.Password(body);
    if (password === false) return res.status(403).send('Password incorrecto!');
    const User = await AuthProv.Email(body);
    const Token = await JsonWebToken.Sign(User);    
    return res.status(200).json({Token});
};

AuthCtrl.User = async (req, res) => {
    let data = req.decoded;
    return res.status(200).json({data});
};

module.exports = AuthCtrl;