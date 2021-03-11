const { Router } = require('express');
const { usuariosGet,
        usuariosPost,
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete 
      } = require('../controllers/userController');

const router = Router();

router.get('/', usuariosGet);

router.post('/', usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);


router.delete('/:id', usuariosDelete);




module.exports = router;