const { request, response } = require('express');
const { body } = require('express-validator');
const { Producto } = require('../models');


// ObtenerProductos - paginado - total - populate
exports.obtenerProductos = async ( req = request, res = response ) => {
    
    const { limite=5, desde=0, p=1 } = req.query;

    const reps = await Promise.all([
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true }).populate('usuario','name').populate('categoria','nombre')
        .limit(Number( limite ))
    ]);

    // DESTRUCTURACION DE ARREGLO
    const [ total, Productos ] = reps;
    
    res.json({
        total,
        Productos
        
    });

}


// ObtenerProducto - populate {}
exports.obtenerProducto = async ( req = request, res = response ) => {
    try {
        const { id } = req.params;
        
        const producto = await Producto.findById(id).populate('usuario','name').populate('categoria','nombre'); 

        res.json({
            producto
        });
        
    } catch (error) {
        console.log(error);
        res.status.json({
            msg:'Hubo un error',
            error
        });
    }
}


exports.crearProducto = async (req = request, response = response) => {

    // const { estado, usuario, ...body } = req.body;

    const { nombre, precio, categoria, descripcion, disponible } = req.body;

    nombre.toUpperCase();
    

    const ProductoDB = await Producto.findOne({ nombre });

    if(ProductoDB){
        return response.status(400).json({
            msg: `El Producto ${ProductoDB.nombre} , ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.uid,
        precio,
        categoria,
        descripcion,
        disponible
    }

    // const data = {
    //     ...body,
    //     nombre: body.nombre.toUpperCase();
    //     usuario: req.uid,

    // }

    const nuevoProducto = new Producto(data).populate('usuario','name');

    // Guardar DB
    await nuevoProducto.save();

    response.status(201).json(nuevoProducto);


}



// actualizarProducto 
exports.actualizarProducto  = async ( req = request, res = response ) => {

    try {
        const { id } = req.params;
        
        const { estado, usuario, ...data } = req.body;

        if(data.nombre){
            data.nombre = data.nombre.toUpperCase();
        }

        
        data.usuario = req.uid;

        const productoActualizar = await Producto.findByIdAndUpdate( id, data, { new: true} ).populate('usuario','name').populate('categoria','nombre');  

        res.json({
            msg:'Producto actualizado con exito',
            productoActualizar
        });

        
    } catch (error) {
        console.log(error);
        res.status.json({
            msg:'Hubo un error',
            error
        });
    }


}



// borrarProducto - estado: false
exports.borrarProducto  = async ( req = request, res = response ) => {

    try {
        const { id } = req.params;
        usuarioAutenticado = req.usuarioAutenticado;

        const ProductoEliminar = await Producto.findByIdAndUpdate( id, {estado: false}, {new : true} );  


        res.json({
            msg:`Producto con el ID: ${id} fue eliminado`,
            ProductoEliminar
        });

        
    } catch (error) {
        console.log(error);
        res.status.json({
            msg:'Hubo un error',
            error
        });
    }


}
