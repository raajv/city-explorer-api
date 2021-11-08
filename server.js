'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const weatherHandler = require('./weather.js')
const handleGetMovie = require ('./movie.js')

app.use(cors());
app.get('/weather',weatherHandler );
app.get('/movie',handleGetMovie);


const PORT = process.env.PORT 
app.get('/hello', (request, response) => { response.send('Hello, it works!') })
app.listen(PORT, () => console.log(`Server up on ${PORT}`));

