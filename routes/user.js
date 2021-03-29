const { Router } = require('express');

const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');


const { esRoleValido, emailExiste, existeUsuario }= require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost,
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete 
      } = require('../controllers/userController');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
        check('name', 'The name is required').not().isEmpty(),
        check('password','The password is required and more than 6 letters').not().isEmpty().isLength({ min:6}),
        check('email').custom((email)=>emailExiste(email)),
        // check('rol','Not a valid role').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( (rol) => esRoleValido(rol)),
        validarCampos 
    ], usuariosPost);

router.put('/:id',[

    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuario),
    check('rol').custom( (rol) => esRoleValido(rol)),
    validarCampos 

    ], usuariosPut);

router.patch('/', 

usuariosPatch);


router.delete('/:id',
    validarJWT, 
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    [
        check('id','No es un ID valido').isMongoId(),
        check('id').custom(existeUsuario),
        validarCampos
    ],
    usuariosDelete);




module.exports = router;