'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

app.get('/weather', handleGetWeather);
app.get('/movie',handleGetMovie);

async function handleGetWeather(req,res){
  const { lat, lon } = req.query;
  const url = `http://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
  try{const resultsFromAPI = await axios.get(url);
    const dailyWeather = resultsFromAPI.data.data.map(weath => new Weatherforecast(weath));
    res.status(200).send(dailyWeather);
}catch(e){
  res.status(400);
}}

async function handleGetMovie(req,res){
  const { query } = req.query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`
  try{const resultsFromAPI = await axios.get(url);
    const searchedMovie = resultsFromAPI.data.results.map(movie=> new Moviesearched(movie));
    console.log(searchedMovie);
    res.status(200).send(searchedMovie);
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

class Moviesearched {
  constructor(obj){
    this.original_title= obj.original_title;
    this.overview=obj.overview;
    this.release_date = obj.release_date;
    this.poster_path = obj.poster_path;
  }
}