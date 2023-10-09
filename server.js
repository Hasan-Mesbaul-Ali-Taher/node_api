const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Import product module
const Product = require('./models/productModel');

// add middleware
app.use(express.json());


// routes
app.get('/', (req, res) => {
    res.send('Welcome to Node API');
});

app.get('/blog', (req, res) => {
    res.send('Welcome to Node API - Blog. This is a blog page');
});

app.post('/product', async(req, res) => {
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
.connect('mongodb+srv://hasan:hasan@cluster0.wdogl2i.mongodb.net/node_api?retryWrites=true&w=majority&appName=AtlasApp')
.then(() => {
    console.log('MongoDB connected');
    // start server to listen to port 3000 and the callback funtion will be called once the server is started
    app.listen(3000, () => {
    console.log('server started. Node api is running on: http://localhost:3000');
    });
})
.catch(err =>{
    console.log(err);
})

