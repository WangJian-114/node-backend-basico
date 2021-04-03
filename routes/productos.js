const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');
const { existeProducto, existeCategoria } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validar-roles');



const  productosController  = require('../controllers/productosController');


const router = Router();

// Obtener todas los productos - Publico
router.get('/', productosController.obtenerProductos);



// Obtener una Producto por id - Publico
router.get('/:id', [ 
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeProducto)
    ],
    validarCampos,
    productosController.obtenerProducto
);


// Crear Producto - privado -cualquier persona con un token valido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un ID de Mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
    ],
    productosController.crearProducto
);

// Actualizar Producto - privado -cualquier persona con un token valido
router.put('/:id', [
    validarJWT, 
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
    ],
    productosController.actualizarProducto    
);


// Borrar una Producto - privado - Admin
router.delete('/:id',[ 
    validarJWT, 
    esAdminRole,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
    ],
    productosController.borrarProducto
);









module.exports = router;