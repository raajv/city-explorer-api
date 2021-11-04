'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// const shoppingList = require('./myShoppingList.json');
const weather = require('./data/weather.json');
const app = express();
app.use(cors());

app.get('/weather', handleGetWeather);

function handleGetWeather(req,res){
  const cityName = req.query.city;
  const lat = req.query.lat;
  const lon = req.query.lon;
  const cityToSend =weather.find(city=>{
    if((city.city_name === cityName)){
      return true;
    } return false;
  });
  if(cityToSend){
    const forecastData =cityToSend.data.map(city=> new Weatherforecast(city));
res.send(forecastData);
}else{
  res.send.status(404);
}
}
const PORT = process.env.PORT 
app.get('/hello', (request, response) => { response.send('Hello, it works!') })
app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));

class Weatherforecast {
  constructor(obj){
    this.min_temp= obj.min_temp;
    this.max_temp=obj.max_temp;
    this.description = obj.weather.description;
  }
}