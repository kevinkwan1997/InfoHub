const apikey = 'b22fdf832ac62d03d6cece72af4faa5f'
const cityNameTemp = 'Asheville'

const weatherType = document.getElementById('weather-type')
const weatherDesc = document.getElementById('weather-desc')
const temp = document.getElementById('temperature')
const humidity = document.getElementById('humidity')
const weatherIcon = document.getElementById('weather-icon');
const footer = document.getElementById('footer');
const loc = document.getElementById('location');

let allData = []
let weatherData = {};
let tempData = {};

window.addEventListener('DOMContentLoaded', (event) => {
    loc.innerText = 'Weather for ' + cityNameTemp;
    loadWeatherData();
})

async function loadWeatherData() {
    var data = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityNameTemp + '&appid=' + apikey)
    .then((resp) => resp.json())
    .then(data => {
        allData = data;
        weatherData = data.weather;
        tempData = data.main;
    })
    console.log(allData);

    weatherData = Object.values(weatherData[0]);
    weatherType.innerText = weatherData[1]
    weatherDesc.innerText = weatherData[2]
    pickIcon();

    /* Kelvin to fahrenheit conversion */

    temp.innerText = Math.round(((tempData.temp * (9/5)) - 459.67) * 10 / 10) + 'F';
}

function pickIcon() {
    let weather = weatherType.innerHTML
    var base = 'http://openweathermap.org/img/wn/'
    if (weather === 'Clouds') {
        base += '04d.png';
        footer.style.backgroundColor = '#EBEBEB'
    } else if (weather === 'Clear') {
        base += '01d.png';
        footer.style.backgroundColor = '#64BEF3'
    } else if (weather === 'Snow') {
        base += '13d.png';
        footer.style.backgroundColor = '#D2F9F5'
    } else if (weather === 'Rain') {
        base += '10d.png';
        footer.style.backgroundColor = '#BEBEBE'
    } else if (weather === 'Drizzle') {
        base += '09d.png';
        footer.style.backgroundColor = '#DDF6FF'
    } else if (weather === 'Thunderstorm') {
        base += '11d.png';
        footer.style.backgroundColor = '#8F8F8F'
    } else if (weather === 'Fog') {
        base += '50d.png';
        footer.style.backgroundColor = '#F0F0F0'
    }

    weatherIcon.src = base;

}
