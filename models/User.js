const moongose = require('mongoose');

const UserSchema = moongose.Schema({

    name: {
        type: String,
        require: [true, 'the name is required'],
        trim:true
    },

    email: {
        type: String,
        require: [true, 'the email is required'],
        trim:true,
        unique: true
    },

    password: {
        type: String,
        require: [true, 'the password is required'],
        trim:true
    },

    image: {
        type: String
    },

    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },

    state: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    }

});

// Tiene que ser una funcion normal
UserSchema.methods.toJSON = function() {
    // Sacando la v y password , dejando todo los de mas
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}


module.exports = moongose.model('User', UserSchema);