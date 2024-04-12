// controllers/productController.js

const Product = require('../model/product');

const addProduct = async (req, res) => {
    const { dish, imgdata, address, somedata, price, rating, stock } = req.body;

    try {
        // Create a new product document
        const newProduct = new Product({
            dish,
            imgdata,
            address,
            somedata,
            price,
            rating,
            stock
        });

        // Save the new product to the database
        await newProduct.save();

        // Respond with success message and the newly created product
        res.status(201).json({ msg: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ msg: error.message });
    }
};
const getProducts = async (req, res) => {
    try {
        // Query the database to get all products
        const products = await Product.find();

        // Respond with the array of products
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ msg: error.message });
    }
};
const deleteProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        // Find the product by ID and delete it
        await Product.findByIdAndDelete(productId);

        // Respond with success message
        res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ msg: error.message });
    }
};
const updateProductById = async (req, res) => {
    const productId = req.params.id;
    const { dish, imgdata, address, somedata, price, rating, stock } = req.body;

    try {
        // Find the product by ID and update its details
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            dish,
            imgdata,
            address,
            somedata,
            price,
            rating,
            stock
        }, { new: true });

        // Check if the product was found and updated successfully
        if (updatedProduct) {
            res.status(200).json({ msg: 'Product updated successfully', product: updatedProduct });
        } else {
            res.status(404).json({ msg: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    addProduct,
    getProducts,
    deleteProductById,
    updateProductById
};
