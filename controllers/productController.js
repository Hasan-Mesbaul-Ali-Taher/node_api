const Product = require('../models/productModel')

const asyncHandler = require('express-async-handler')


// Get all products
const getProducts = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
        // console.log(error.message);
        // res.status(500).json({ message: error.message });
    }
})

// Get a product by ID
const getProductById = asyncHandler(async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        // or
        // const {id} = req.params;
        // const product = await Product.findById(id);

        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
        // console.log(error.message);
        // res.status(500).json({ message: error.message });
    }
})

// Update a product by ID
const updateProductById = asyncHandler(async(req, res) => {   
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // WE can not find any product with this id in database
        if(!product) {
            res.status(404);
            throw new Error(`Product not found with ID ${id}`);
            // return res.status(404).json({ message: `Product not found with ID ${id}` });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
        // res.status(500).json({ message: error.message });
    }
})

// Delete a product by ID
const deleteProductById = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            res.status(404);
            throw new Error(`Product not found with ID ${id}`);
            // return res.status(404).json({ message: `Product not found with ID ${id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
        // res.status(500).json({ message: error.message });
    }
})

// Create a new product
const createProduct = asyncHandler(async(req, res) => {
    // console.log(req.body);
    // res.send(req.body);
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
        // console.log(error.message);
        // res.status(500).json({ message: error.message });
    }
})



module.exports = {
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    createProduct,

}