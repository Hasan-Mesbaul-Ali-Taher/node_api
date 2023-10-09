require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Import product module
const Product = require('./models/productModel');

// 
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000;

// add middleware
app.use(express.json());
// to use form urlencoded data
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/', (req, res) => {
    res.send('Welcome to Node API');
});

app.get('/blog', (req, res) => {
    res.send('Welcome to Node API - Blog. This is a blog page');
});

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

// Get product by ID   
app.get('/products/:id', async(req, res) => {
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
app.put('/products/:id', async(req, res) => {   
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
app.delete('/products/:id', async(req, res) => {
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

app.post('/products', async(req, res) => {
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

mongoose
.connect(MONGO_URL)
.then(() => {
    console.log('MongoDB connected');
    // start server to listen to port 3000 and the callback funtion will be called once the server is started
    app.listen(PORT, () => {
    console.log(`server started. Node api is running on: http://localhost:${PORT}`);
    });
})
.catch(err =>{
    console.log(err);
})

