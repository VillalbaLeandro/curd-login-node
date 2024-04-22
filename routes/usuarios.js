const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos')

const {
    mailExiste,
    existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
    usuariosDelete,
    usuariosPut,
    usuariosPost,
    usuariosPatch, 
    usuarioGet} = require('../controllers/usuarios');

const router = Router();

// -----Traer todos los usuarios - en los params key values limite = 5 y desde = 0  <--- por defecto   ----------------------------------------------------
router.get('/', usuariosGet)

//----------  Busca usuario por correo  -// ok Params key: nombre o key: correo(completo)
router.get('/search', usuarioGet)

// -------Actualizar usuario por body-------------------------------------------------------------------------------------------------------------------------------
router.put('/:id', [
    check('id', 'No es un id válido').isMongoId()
        .custom((id) => existeUsuarioPorId(id))
        .withMessage('El id no existe'),
    validarCampos
], usuariosPut)

// ---------crear usuario por body--------------------------------------------------------------------------------------------------------------------------
router.post('/', [
    check('nombre', 'El nombre de usuario es requerido').notEmpty(),
    check('password', 'La constraseña es requerida')
        .notEmpty(),
    //Esto es el regex para la validacion de contraseñas mas seguras
    // .matches(regex.password)
    // .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número, un carácter especial y tener al menos 8 caracteres de longitud'),
    check('correo', 'El correo es requerido')
        .notEmpty()
        .isEmail()
        .withMessage('El mail ingresado no es valido')
        .custom((correo) => mailExiste(correo))
        .withMessage('El correo ya se encuentra registrado'),
    validarCampos
], usuariosPost)

// -------Eliminar por id con token auth de ususario logeado ----------------------------------------------------------------------------------
router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id', 'El id no existe').custom((id) => existeUsuarioPorId(id)),
    validarCampos
], usuariosDelete);

// -----------------------------------------------------------------------------------------------------------------------------------------------------------
router.patch('/', usuariosPatch)

module.exports = router;