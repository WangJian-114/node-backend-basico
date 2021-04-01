const { response, request } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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


const googleSignin = async (req = request, res = response) => {

    const { id_token } = req.body;

    const googleUser = await googleVerify(id_token);
    
    console.log(id_token);

    try {

        const { email, name, image } = googleUser;

        let usuario = await User.findOne({ email });

        if(!usuario) {
            // creamos el usuario
            const data = {
                name,
                email,
                password: ':P',
                image, 
                google: true
            };

            usuario = new User(data);
            await usuario.save();
        } 

        // Si el usuario en BD  tiene como estado false
        if(!usuario.state){
            return res.status(401).json({
                msg:'Error! contacta con el administrador, usuario bloqueado'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );


        res.json({
            msg:'Todo ok! Google signin',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg:'Token de Google no es valido',
            googleUser,
            id_token
        });
    }
    

  

}



module.exports = {
    login,
    googleSignin
}
