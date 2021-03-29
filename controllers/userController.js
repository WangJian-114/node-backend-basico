const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');



const usuariosGet = async (req, res = response) => {

    const { limite=5, desde=0 } = req.query;


    // const usuarios = await User.find({ state: true })
    //     .skip(Number( desde ))
    //     .limit(Number( limite ));

    // const total = await User.countDocuments({ state: true });

    /** EJECUTAR MAS DE UN AWAIT  */
    // Devuelve un arreglo de promesa
    const reps = await Promise.all([
        User.countDocuments({ state: true }),
        User.find({ state: true })
        .skip(Number( desde ))
        .limit(Number( limite ))
    ]);

    // DESTRUCTURACION DE ARREGLO
    const [ total, usuario ] = reps;

    res.json({
        total,
        usuario
        
        // total,
        // usuarios
    });
};

const usuariosPost = async (req, res = response) => {
    try {
        const { name, email, password, rol } = req.body;
        const user = new User({ name, email, password, rol });

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        // Guardar en BD
        await user.save();

        res.json({
            msg:'post API - Registro agregado correctamente',
            user

        });
    
    } catch (error) {
        console.log(error);
        res.json({
            msg:'Hubo un error'
        })
    }   



};

const usuariosPut = async (req, res = response) => {

    const { id } =req.params;

    const { _id ,password, google, correo, ...resto } = req.body;

    
    // TODO validar contra base de datos
    if( password ) {
        // Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await User.findByIdAndUpdate( id, resto );   


   
    res.json({
        estado:'Usuario actualizado con exito',
        usuario
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg:'patch API - controlador'
    });
};

const usuariosDelete = async (req, res = response) => {

    // id del usuario que se va a eliminar
    const { id } = req.params;


    //usuario que esta realizando la operacion
   
    usuarioAutenticado =req.usuarioAutenticado;

    // Borrar Fisicamente
    // No se recomienda
    /* 
    const usuarioEliminado = await User.findByIdAndDelete( id );
    */
    // La forma recomendada
    const usuario = await User.findByIdAndUpdate(id, { state: false });


    // console.log(req.params);
    // console.log(req.params.id);
    res.json({
        msg:`Usuario con el ID: ${id} fue eliminado`,
        usuarioAutenticado,
        
        usuario
    });
};


module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

}