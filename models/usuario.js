
const { Schema, model } = require('mongoose');
const rolUsuario = require('../utils/roles');


const UsuarioSchema = Schema({
    // nombre: {
    //     type: String,
    //     required: [true, 'El nombre es obligatorio']
    // },
    correo: {
        type: String,
        required: [true, 'El mail es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true
    }

})

UsuarioSchema.methods.toJSON = function () {
    // Desestructura el objeto this (el objeto de usuario actual)
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    // Retorna un nuevo objeto JSON que excluye los campos __v y password
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);