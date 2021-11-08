'use strict';
const axios = require('axios');
const cache = require('./cache');

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  if (cache[{lat,lon}] && (Date.now()-Date.now()<50000)){
response.status(200).send(cache[{lat,lon}]);
console.log('cache hit');
}else{
  console.log('cache miss')
}

  const url = `http://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  axios 
   .get(url)
    .then(result => {
    const dailyWeather= result.data.data.map(weath => new Weatherforecast(weath))
    cache[{lat,lon}]= dailyWeather
    response.status(200).send(dailyWeather);
  })
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
} 

class Weatherforecast {
  constructor(obj){
    this.timezone= obj.timezone;
    this.temp=obj.temp;
    this.description = obj.weather.description;
  }
}
module.exports=weatherHandler