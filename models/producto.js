const moongose = require('mongoose');

const ProductoSchema = moongose.Schema({
    
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true
    },

    estado: {
        type: Boolean,
        default: true,
        require: true
    },

    usuario: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    precio: {
        type:Number,
        default: 0,
    },

    categoria: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },

    descripcion: {
        type: String
    },

    disponible: {
        type: Boolean,
        default: true
    }


});

ProductoSchema.methods.toJSON = function() {
    // Sacando la v y password , dejando todo los de mas
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = moongose.model('Producto', ProductoSchema );
