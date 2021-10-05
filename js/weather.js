const apikey = 'b22fdf832ac62d03d6cece72af4faa5f'
const cityNameTemp = 'Charlotte'

const weatherType = document.getElementById('weather-type')
const weatherDesc = document.getElementById('weather-desc')
const temp = document.getElementById('temperature')
const humidity = document.getElementById('humidity')

let allData = []
let weatherData = {};
let temperatureActual = 0;

window.addEventListener('DOMContentLoaded', (event) => {
    loadWeatherData();
})

async function loadWeatherData() {
    var data = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityNameTemp + '&appid=' + apikey)
    .then((resp) => resp.json())
    .then(data => {
        allData = data;
        weatherData = data.weather;
    })

    weatherData = Object.values(weatherData[0]);
    console.log(weatherData);
    weatherType.innerText = weatherData[1]
    weatherDesc.innerText = weatherData[2]
    temperatureActual = 
    temp.innerText = temperatureActual;
}
