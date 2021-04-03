const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');
const { existeCategoria } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validar-roles');



const  categoriasController  = require('../controllers/categoriasController');


const router = Router();

// Obtener todas las categorias - Publico
router.get('/', categoriasController.obtenerCategorias);





// Obtener una categoria por id - Publico
router.get('/:id', [ 
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoria)
    ],
    validarCampos,
    categoriasController.obtenerCategoria
);


// Crear categoria - privado -cualquier persona con un token valido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ],
    categoriasController.crearCategoria
);

// Actualizar categoria - privado -cualquier persona con un token valido
router.put('/:id', [
    validarJWT, 
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
    ],
    categoriasController.actualizarCategoria    
);


// Borrar una categoria - privado - Admin
router.delete('/:id',[ 
    validarJWT, 
    esAdminRole,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
    ],
    categoriasController.borrarCategoria
);









module.exports = router;