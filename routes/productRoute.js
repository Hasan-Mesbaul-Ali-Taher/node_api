const express = require('express');
const router = express.Router();

// Import product module
const Product = require('../models/productModel');


router.get('/', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

// Get product by ID   
router.get('/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        // or
        // const {id} = req.params;
        // const product = await Product.findById(id);

        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

// Update product by ID
router.put('/:id', async(req, res) => {   
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // WE can not find any product with this id in database
        if(!product) {
            return res.status(404).json({ message: `Product not found with ID ${id}` });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Delete a product by ID
router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({ message: `Product not found with ID ${id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/', async(req, res) => {
    // console.log(req.body);
    // res.send(req.body);
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

// export the router out to server.js
module.exports = router