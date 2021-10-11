const apikey = 'b22fdf832ac62d03d6cece72af4faa5f'
const cityNameTemp = 'Charlotte'

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
let hourlyData = [];
let coordData = {};
let hourlyWeather = {};
let lat;
let lon;

let weatherIndex = 0;

window.addEventListener('DOMContentLoaded', (event) => {
    loc.innerText = 'Weather for ' + cityNameTemp;
    loadWeatherData();
})


footer.addEventListener('click', () => {
    clear();
    fetchHourlyData();
})

async function loadWeatherData() {
    var data = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityNameTemp + '&appid=' + apikey)
    .then((resp) => resp.json())
    .then(data => {
        allData = data;
        weatherData = data.weather;
        tempData = data.main;
        coordData = data.coord;
    })

    weatherData = Object.values(weatherData[0]);
    weatherType.innerText = weatherData[1]
    weatherDesc.innerText = weatherData[2]
    lat = coordData.lat;
    lon = coordData.lon;
    pickBg();
    let newTemp = convertTemp(tempData.temp);
    setTempColor(newTemp);

}

async function fetchHourlyData() {
    var data = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=current' + '&appid=' + apikey)
    .then((resp) => resp.json())
    .then(data => {
        console.log(data);
        hourlyData = data.hourly;
    })

    createFullWeather();

}

function createFullWeather() {
    const hourlyList = document.createElement('ul');
    hourlyList.id = 'hourly-list'
    

    hourlyList.id = 'hourly-list';
    let currentDate = new Date();   
    let currHour = currentDate.getHours() - 1;
    let currDay = currentDate.getUTCDay() + 3;
    let temp;
    let feelsLike;
    hourlyData.forEach((hour) => {
        weatherIndex+=1;
        let hourElement = document.createElement('li');
        let hourImg = document.createElement('img');
        hourImg.classList.add('hour-img')
        hourElement.classList.add('hour-element')
        temp = convertTemp(hour.temp);
        feelsLike = convertTemp(hour.feels_like)
        currHour += 1; 
        if (currHour > 24) {
            currHour = 0;
            currDay += 1;
            let hourElement = document.createElement('li');
            hourElement.innerText = 'Hourly results for ' + (currentDate.getMonth() + 1) + '/' + (currDay);
            hourlyList.appendChild(hourElement)
        }
        hourElement.style.listStyle = 'none'
        let hourTime = document.createElement('p');
        hourTime.innerText = currHour + ':00';
        let hourHead = document.createElement('p');
        hourHead.innerText = temp;
        let hourlyMain = Object.values(hour.weather);
        hourImg.src = getSource(hourlyMain[0].main);
        let hourlyDesc = document.createElement('p');
        hourlyDesc.innerText = hourlyMain[0].description
        hourElement.appendChild(hourTime);
        hourElement.appendChild(hourImg)
        hourElement.appendChild(hourHead)
        hourElement.appendChild(hourlyDesc)


        hourlyList.appendChild(hourElement);
    })
    mainDiv.appendChild(hourlyList);

}

function clear() {
    mainDiv.innerHTML = '';
}

function closeArticle() {
    fullArticle.style.display = 'none';
}

function getSource(weather) {
    var base = 'http://openweathermap.org/img/wn/'
    if (weather === 'Clouds') {
        base += '04d.png';
    } else if (weather === 'Clear') {
        base += '01d.png';
    } else if (weather === 'Snow') {
        base += '13d.png';
    } else if (weather === 'Rain') {
        base += '10d.png';
    } else if (weather === 'Drizzle') {
        base += '09d.png';
    } else if (weather === 'Thunderstorm') {
        base += '11d.png';
    } else if (weather === 'Fog') {
        base += '50d.png';
    }

    
    return base;
    
}

function pickBg() {
    let weather = weatherType.innerHTML
    var base = 'http://openweathermap.org/img/wn/'
    if (weather === 'Clouds') {
        base += '04d.png';
        footer.style.backgroundImage = 'url(./resources/cloudfoot.jpg)'
    } else if (weather === 'Clear') {
        base += '01d.png';
        footer.style.backgroundImage = 'url(./resources/clearfoot.jpg)'
    } else if (weather === 'Snow') {
        base += '13d.png';
        footer.style.backgroundImage = 'url(./resources/snowfoot.jpg)'
    } else if (weather === 'Rain') {
        base += '10d.png';
        footer.style.backgroundImage = 'url(./resources/rainfoot.jpg)'
    } else if (weather === 'Drizzle') {
        base += '09d.png';
        footer.style.backgroundImage = 'url(./resources/rainfoot.jpg)'
    } else if (weather === 'Thunderstorm') {
        base += '11d.png';
        footer.style.backgroundImage = 'url(./resources/thunderfoot.jpg)'
    } else if (weather === 'Fog') {
        base += '50d.png';
        footer.style.backgroundImage = 'url(./resources/fogfoot.jpg)'
    }

    weatherIcon.src = base;

}


function convertTemp(temperature) {
    /* Kelvin to fahrenheit conversion */
    const fTemp = Math.round(((temperature * (9/5)) - 459.67) * 10 / 10);  
    return fTemp;

}

function setTempColor(fTemp) {
    if(fTemp >= 80) {
        temp.style.color = 'red';
    } else if (fTemp >= 45 && fTemp < 80) {
        temp.style.color = 'orange';
    } else if (fTemp < 45) {
        temp.style.color = 'lightblue';
    }
    temp.innerText = fTemp + 'F';
}
