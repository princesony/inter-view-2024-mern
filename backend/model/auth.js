// userModel.js
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    cartProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    role: {
        type: String,
        default: 'user'
    }
});



const User = mongoose.model('User', userSchema);

module.exports = User;
