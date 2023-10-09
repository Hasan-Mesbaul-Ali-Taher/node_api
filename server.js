require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute');

// 
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000;

// add middleware
app.use(express.json());
// to use form urlencoded data
app.use(express.urlencoded({ extended: false }));
// a middleware to use the productRoute
app.use('/api/products', productRoute)

// routes
app.get('/', (req, res) => {
    res.send('Welcome to Node API');
});

app.get('/blog', (req, res) => {
    res.send('Welcome to Node API - Blog. This is a blog page');
});


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

