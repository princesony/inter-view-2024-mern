const mongoose = require('mongoose');

// Define schema
const porductSchema = new mongoose.Schema({
    dish: {
        type: String,
        required: true
    },
    imgdata: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    delimg: {
        type: String,
        default: "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp"
    },
    somedata: { 
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    arrimg: {
        type: String,
        default: "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp"
    },
    stock: {
        type: Number,
        required: true
    }
});

// Create model
const Product = mongoose.model('Product', porductSchema);

module.exports = Product;
 