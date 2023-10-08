const express = require('express');
const app = express();

// routes
app.get('/', (req, res) => {
    res.send('Welcome to Node API');
});


// start server to listen to port 3000 and the callback funtion will be called once the server is started
app.listen(3000, () => {
    console.log('server started. Node api is running on: http://localhost:3000');
});