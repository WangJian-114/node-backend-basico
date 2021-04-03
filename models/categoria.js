const moongose = require('mongoose');

const CategoriaSchema = moongose.Schema({
    
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
    }


});

CategoriaSchema.methods.toJSON = function() {
    // Sacando la v y password , dejando todo los de mas
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = moongose.model('Categoria', CategoriaSchema );
