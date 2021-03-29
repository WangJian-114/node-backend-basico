const jwt = require('jsonwebtoken');

const generarJWT = ( uid ='', name = 'Jian' ) => {
    return new Promise((resolve, reject) => {

        const payload = { uid, name };

        jwt.sign(payload, process.env.SECRETOPRIVATEKEY, {
            expiresIn:'2h'
        },(err, token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else {
                resolve(token);
            }
        })

    })    
}

module.exports = {
    generarJWT
}