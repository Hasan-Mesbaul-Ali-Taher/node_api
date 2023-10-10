require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');
// 
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND;
// use cors middleware
// app.use(cors({ origin: '*' })); // this allows all origins. that is anyone can access your backend api
// app.use(cors()); // this allows all origins. that is anyone can access your backend api
// app.use(cors({ origin: 'http://localhost:3000' })); // this allows only http://localhost:3000 to access your backend api

const corsOptions = {
    // origin: 'http://example.com',
    // origin: ['http://localhost:3000', 'http://example.com'], // this allows multiple origins to access your backend api
    // origin: 'http://localhost:3000', // this allows only http://localhost:3000 to access your backend api
    
    origin: FRONTEND, 
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// add middleware
app.use(express.json());
// to use form urlencoded data
app.use(express.urlencoded({ extended: false }));
// a middleware to use the productRoute
app.use('/api/products', productRoute)

// routes
app.get('/', (req, res) => {
    // used to test error middleware
    // throw new Error('Fake error');
    res.send('Welcome to Node API');
});

app.get('/blog', (req, res) => {
    res.send('Welcome to Node API - Blog. This is a blog page');
});


app.use(errorMiddleware);

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

