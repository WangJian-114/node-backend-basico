const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuario }= require('../helpers/db-validators');

const { 
        login
      } = require('../controllers/authController');

const router = Router();


router.post('/login', [
        check('password','The password is required and more than 6 letters').not().isEmpty().isLength({ min:6}),
        check('email','El email es obligatorio').not().isEmpty(),
        // check('rol','Not a valid role').isIn(['ADMIN_ROLE','USER_ROLE']),
        // check('rol').custom( (rol) => esRoleValido(rol)),
        validarCampos 
    ], login);




module.exports = router;