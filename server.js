'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const handleGetWeather = require('./weather.js')
const handleGetMovie = require ('./movie.js')

app.use(cors());
app.get('/weather',handleGetWeather );
app.get('/movie',handleGetMovie);


const PORT = process.env.PORT 
app.get('/hello', (request, response) => { response.send('Hello, it works!') })
app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));

