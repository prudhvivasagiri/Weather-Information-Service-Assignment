
// const url = 'https://api.weatherstack.com/current?access_key=7dedb330a88f9f82c669828804eca7dc&query=New Delhi';
// const options = {
// 	method: 'GET'
// };

// fetch(url,options).then(response=>response.json()).then(jsonData=> console.log(jsonData))


const express = require('express');

const app = express();

app.listen(3000,()=>{
    console.log('Server running at http://localhost:3000/')
})

// app.get('/', async(request,response)=>{
//     response.send('Hello World');
// })

app.get('/weather/', async(req,res)=>{
    const {city} = req.query;
    const url = `https://api.weatherstack.com/current?access_key=7dedb330a88f9f82c669828804eca7dc&query=${city}`
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
    // res.send(response)
})