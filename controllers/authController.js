const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res) =>{

    const { email, password } = req.body;

    try {
        
        // Verificar si el email existe
        const usuario = await User.findOne({ email });

        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - email'
            });
        }
        
        // Si el usuario esta activo
        if(!usuario.state){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - state : false'
            });
        }


        // Verificar el password
        const validarPassword = bcrypt.compareSync( password, usuario.password );
        if(!validarPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );



  
        
        res.json({
            msg: 'login ok',
            usuario,
            token
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg:'Hubo un error'
        })
    }

}

module.exports = {
    login
}
