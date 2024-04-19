const { Router } = require('express');
const { check } = require('express-validator');

const router = Router()
const { validarCampos } = require('../middleware/validar-campos');
const { login } = require('../controllers/auth');

router.post('/login',[
    check('correo', 'El correo es obligatorio').notEmpty().isEmail().withMessage('El mail no tiene un formato valido'),
    check('password','La contraseña es obligatoria').notEmpty(),
    validarCampos
], login )


module.exports = router; 
