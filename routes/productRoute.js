const express = require('express');
const router = express.Router();

// Import product module
const Product = require('../models/productModel');

const {getProducts, getProductById, updateProductById, deleteProductById, createProduct} = require('../controllers/productController');

router.get('/', getProducts);

// Get product by ID   
router.get('/:id', getProductById);

// Update product by ID
router.put('/:id', updateProductById);

// Delete a product by ID
router.delete('/:id', deleteProductById);

// Create a new product
router.post('/', createProduct);

// export the router out to server.js
module.exports = router