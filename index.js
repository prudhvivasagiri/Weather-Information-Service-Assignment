
const express = require('express');

const app = express();

//Initializing the Server
app.listen(3000,()=>{
    console.log('Server running at http://localhost:3000/')
})


//calling API to get weather details
//Enter city name at the end of url and search for weather details 'http://localhost:3000/weather?city='

app.get('/weather/', async(req,res)=>{
    const {city} = req.query;
    const url = `https://api.weatherstack.com/current?access_key=ca9557d389950a51530bf831f4d48a50&query=${city}`
    let options = {
        method: "GET"
      };
    let response
    await fetch(url,options).then(response=>response.json()).then(jsonData=> response = jsonData)
    const weatherInfo = {
        location: response.location.name,
        country: response.location.country,
        region: response.location.region,
        temperature: response.current.temperature,
        feelslike: response.current.feelslike,
        weather: response.current.weather_descriptions[0],
        wind_speed: response.current.wind_speed,
        humidity: response.current.humidity,
        precipitation: response.current.precipitation,
        uv_index: response.current.uv_index
    }
    res.send(weatherInfo)
})
