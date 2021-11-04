'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

app.get('/weather', handleGetWeather);

async function handleGetWeather(req,res){
  const { lat, lon } = req.query;
  const url = `http://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
  try{const resultsFromAPI = await axios.get(url);
    const dailyWeather = resultsFromAPI.data.data.map(weath => new Weatherforecast(weath));
    
    res.status(200).send(dailyWeather);
    
}catch(e){
  res.status(400);
}}


const PORT = process.env.PORT 
app.get('/hello', (request, response) => { response.send('Hello, it works!') })
app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));

class Weatherforecast {
  constructor(obj){
    this.timezone= obj.timezone;
    this.temp=obj.temp;
    this.description = obj.weather.description;
  }
}

