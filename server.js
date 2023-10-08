const express = require('express');
const app = express();
const mongoose = require('mongoose');

// routes
app.get('/', (req, res) => {
    res.send('Welcome to Node API');
});

app.get('/blog', (req, res) => {
    res.send('Welcome to Node API - Blog. This is a blog page');
});


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

