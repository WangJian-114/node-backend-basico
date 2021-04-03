const { request, response } = require('express');
const { Categoria } = require('../models');


// ObtenerCategorias - paginado - total - populate
exports.obtenerCategorias = async ( req = request, res = response ) => {
    
    const { limite=5, desde=0, p=1 } = req.query;

    const reps = await Promise.all([
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true }).populate('usuario','name')
        .limit(Number( limite ))
    ]);

    // DESTRUCTURACION DE ARREGLO
    const [ total, categorias ] = reps;
    
    res.json({
        total,
        categorias
        
    });

}


// ObtenerCategoria - populate {}
exports.obtenerCategoria = async ( req = request, res = response ) => {
    try {
        const { id } = req.params;
        
        const categoria = await Categoria.findById(id).populate('usuario','name');  

        res.json({
            categoria
        });
        
    } catch (error) {
        console.log(error);
        res.status.json({
            msg:'Hubo un error',
            error
        });
    }
}


exports.crearCategoria = async (req = request, response = response) => {

    const nombre = req.body.nombre.toUpperCase();
    

    const categoriaDB = await Categoria.findOne({ nombre });

    if(categoriaDB){
        return response.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} , ya existe`
        });
    }

    

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.uid
    }

    const categoria = new Categoria(data);

    // Guardar DB
    await categoria.save();

    response.status(201).json(categoria);


}



// actualizarCategoria 
exports.actualizarCategoria  = async ( req = request, res = response ) => {

    try {
        const { id } = req.params;
        
        const { estado, usuario, ...data } = req.body;

        data.nombre = data.nombre.toUpperCase();
        data.usuario = req.uid;
        console.log(req);

        const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true} ).populate('usuario','name');  

        res.json({
            msg:'categoria actualizado con exito',
            categoria,
        });

        
    } catch (error) {
        console.log(error);
        res.status.json({
            msg:'Hubo un error',
            error
        });
    }


}



// borrarCategoria - estado: false
exports.borrarCategoria  = async ( req = request, res = response ) => {

    try {
        const { id } = req.params;
        usuarioAutenticado = req.usuarioAutenticado;

        const categoria = await Categoria.findByIdAndUpdate( id, {estado: false}, {new : true} );  


        res.json({
            msg:`Categoria con el ID: ${id} fue eliminado`,
            categoria
        });

        
    } catch (error) {
        console.log(error);
        res.status.json({
            msg:'Hubo un error',
            error
        });
    }


}
