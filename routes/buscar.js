const { Router } = require('express');

const router = Router();

const { buscar } = require('../controllers/buscarController');


router.get('/:coleccion/:termino',  buscar );



module.exports = router;