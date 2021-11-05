'use strict';
const axios = require('axios');

async function handleGetWeather(req,res){
  const { lat, lon } = req.query;
  const url = `http://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
  try{const resultsFromAPI = await axios.get(url);
  const dailyWeather = resultsFromAPI.data.data.map(weath => new Weatherforecast(weath));
  res.status(200).send(dailyWeather);
  }catch(e){
  res.status(400);
}}

class Weatherforecast {
  constructor(obj){
    this.timezone= obj.timezone;
    this.temp=obj.temp;
    this.description = obj.weather.description;
  }
}
module.exports=handleGetWeather