const Rol = require('../models/role');
const User = require('../models/User');

const esRoleValido = async (rol ='') => {
    const existeRol = await Rol.findOne({ rol });
    if(!existeRol) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}


const emailExiste = async (email = '') => {
    // Verificar si el correo existe
    const exist = await User.findOne({ email });
    if(exist){
        throw new Error(`El correo: ${ email }  ya esta registrado`);
    }
}


const existeUsuario = async ( id ) => {
    // Verificar si el usuario existe
    const exist = await User.findById(id);
    if(!exist){
        throw new Error(`El usuario con ID: ${ id }  No existe`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuario
}

