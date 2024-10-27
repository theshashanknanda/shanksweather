import {API_KEY} from './config.js' 
console.log(API_KEY)

let yourWeather = document.querySelector('.i1')
let searchWeather = document.querySelector('.i2')

let weatherContainer = document.querySelector('.weather-container')
let searchContainer = document.querySelector('.search-weather-container')

let currentTab = yourWeather;
currentTab.classList.add('active')

let searchIcon = document.querySelector('.search-icon')
let locationTitle = document.querySelector('.location-title')
let weatherText = document.querySelector('.weather-text')
let temp = document.querySelector('.temp')

let windSpeed = document.querySelector('.windspeed-value')
let humidity = document.querySelector('.humidity-value')
let clouds = document.querySelector('.cloud-value')

let searchInput = document.querySelector('.search-input')

yourWeather.addEventListener('click', ()=>{
    handleTabChange(yourWeather);

    weatherContainer.classList.remove('hidden')
    weatherContainer.classList.add('visible')

    searchContainer.classList.remove('visible')
    searchContainer.classList.add('hidden')

    fetchLatLong()
})

searchWeather.addEventListener('click', ()=>{
    handleTabChange(searchWeather);

    searchContainer.classList.remove('hidden')
    searchContainer.classList.add('visible')

    weatherContainer.classList.remove('visible')
    weatherContainer.classList.add('hidden')

    searchInput.value = ''
})

function handleTabChange(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove('active')
        currentTab = clickedTab;
        currentTab.classList.add('active')
    }
}

// fetch current location and call api to show current weather
fetchLatLong();

function fetchLatLong(){
    navigator.geolocation.getCurrentPosition((position)=>{
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        searchWeatherBasedOnLatLong(lat, long);
    })
}

function searchWeatherBasedOnLatLong(lat, long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
    .then((res)=>{
        return res.json()
    })
    .then((value)=>{
        setWeatherData(value);
    })
}

searchIcon.addEventListener('click', ()=>{
    let cityInput = searchInput.value

    searchWeatherBasedOnCity(cityInput);
})

function searchWeatherBasedOnCity(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then((res)=>{
        return res.json()
    })
    .then((value)=>{
        setWeatherData(value);

        weatherContainer.classList.remove('hidden')
        weatherContainer.classList.add('visible')
    })
}

function setWeatherData(value){
    locationTitle.textContent = value?.name;
    weatherText.textContent = value?.weather[0]?.main;
    temp.textContent = value?.main?.temp + ' C°'

    windSpeed.textContent = value?.wind?.speed + ' M/S'
    humidity.textContent = value?.main?.humidity + ' %'
    clouds.textContent = value?.clouds?.all + ' %'
}
