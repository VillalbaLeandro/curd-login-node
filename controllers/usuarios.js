const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Buscar usuario por nombre o correo :
const usuarioGet = async (req, res) => {
    const {  correo } = req.query;
    const usuario = await Usuario.findOne({correo})
    res.json(usuario)
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const usuariosGet = async (req = request, res = response) => {
    // Paginación 
    const query = { estado: true }
    const { limite = 5, desde = 0 } = req.query

    const [usuarios, usuariosActivos, totalRegistros] = await Promise.all([
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
        Usuario.countDocuments(query),
        Usuario.countDocuments()
    ])

    const totalMostrados = usuarios.length

    res.json({
        totalRegistros,
        usuariosActivos,
        totalMostrados,
        usuarios
    })
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const usuariosPost = async (req, res) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); //Numero de vueltas, por defecto 10
    usuario.password = bcryptjs.hashSync(password, salt) //Se llama a password que es la propiedad que esta en el Modelo Usuario. 
    // Guardar en BD
    await usuario.save();
    res.json({
        usuario,
        msg: 'Usuario creado con éxito'
    })
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------

const usuariosPut = async (req, res) => {
    const id = req.params.id;

    const { passwordActual, newPassword, ...resto } = req.body;

    if (!id) {
        return res.status(401).json({
            msg: 'El id no existe'
        });
    }

    // Validamos que vengan la contraseña actual y la nueva contraseña
    if (!passwordActual || !newPassword) {
        return res.status(400).json({
            msg: 'Debes proporcionar la contraseña actual y la nueva contraseña'
        });
    }

    // Buscamos el usuario por su id para verificar la contraseña actual
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        return res.status(404).json({
            msg: 'Usuario no encontrado'
        });
    }

    // Validamos la contraseña con la bd
    const passwordValida = await bcryptjs.compare(passwordActual, usuario.password);

    if (!passwordValida) {
        return res.status(400).json({
            msg: 'La contraseña actual no es válida'
        });
    }

    // Encriptamos la nueva contraseña
    const salt = bcryptjs.genSaltSync(); // Número de vueltas, por defecto 10
    const hashedPassword = bcryptjs.hashSync(newPassword, salt);

    // Actualizamos la contraseña del usuario
    await Usuario.findByIdAndUpdate(id, { password: hashedPassword });

    // Retornamos los datos seleccionados al usuario 
    res.json({
        msg: 'Contraseña actualizada con éxito'
    });
};


/// -----------------------------------------------------------------------------------------------------------------------------------------------------------

const usuariosDelete = async (req, res) => {
    const { id } = req.params;

    // const usuario = await Usuario.findByIdAndDelete(id);
    
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    const usuarioAutenticado = req.usuario 
    res.json({
        usuario,
        msg: 'Usuario deshabilitado con éxito'
    }) 
}

/// -----------------------------------------------------------------------------------------------------------------------------------------------------------

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch API'
    })
}

module.exports = {
    usuariosGet,
    usuarioGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}