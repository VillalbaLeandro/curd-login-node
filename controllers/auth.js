const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const login = async(req, res = response) => {
    const { _id, ...resto} = req.body
    const {correo, password} = resto
    
    try {
        // Verificar si el usuario existe,  si no un 400
        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg: 'El usuario no esta registrado en el sistema'
            })
        }
        
        // El usuario esta activo? 
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario se encuentra deshabilitado'
            })
        }
        // Verificar contraseña 
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/password incorrecto'
            })
        }
        res.json({
            usuario,
            msg:"Usuario logeado"
        })
    } catch (error) {
    }
}
    module.exports = {
        login
    }