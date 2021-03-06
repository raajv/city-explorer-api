'use strict';
const axios = require('axios');
const cache = require('./cachemov');

async function handleGetMovie(req,res){
  const { query } = req.query;

  if(cache[{query}]){
    res.status(200).send(cache[{query}]);
    console.log('cache hit');
  }else{
    console.log('cache miss')
  }
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`
  try{const resultsFromAPI = await axios.get(url);
  const searchedMovie = resultsFromAPI.data.results.map(movie=> new Moviesearched(movie));
  cache[{query}]=searchedMovie;
  console.log(searchedMovie);
  res.status(200).send(searchedMovie);
  }catch(e){
  res.status(400);
}}

class Moviesearched {
  constructor(obj){
    this.original_title= obj.original_title;
    this.overview=obj.overview;
    this.release_date = obj.release_date;
    this.poster_path = obj.poster_path;
  }
}

module.exports=handleGetMovie