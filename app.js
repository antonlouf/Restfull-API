const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Import Routes
const postRoute = require('./routes/posts');
const userRoute = require('./routes/users');

//Usage of Middleware 
app.use(bodyParser.json()); 
app.use(cors());

//Routes
app.get('/', (req, res) => {
    res.send('everything check');
});

app.use('/posts', postRoute);
app.use('/users', userRoute);


//Connect to DB 
mongoose.connect('mongodb://localhost:27017', () => 
    console.log('Connected to DB!')
);

//Run API 
app.listen(port, () =>  {
    console.log(`API is running at http://localhost:${port}`);
});
