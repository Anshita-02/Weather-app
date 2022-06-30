// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

//select elements
const imgElement = document.querySelector(".img-icon");
const tempElement = document.querySelector('.temp-value p');
const descElement = document.querySelector('.temp-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

//app data
const weather = {
    temperature:{
        unit : 'celcius'
    }
};

//app constants and var
const KELVIN = 273;
const key = '82005d27a116c2880c8f0fcb866998a0';

//check if browser supports geolacation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
 }else{
    notificationElement.style.display='block';
    notificationElement.innerHTML="<p>Browser doesn't Support Geolocation</p>";
 }

//set users position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude);
}

//show error when there is an issue with geolocation service
function showError(error){
    notificationElement.style.display='block';
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

//get weather from api provider
function getWeather(latitude,longitude){
    let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)/*to fetch data from api we use fetch method*/
            .then(function(response){/*then we get a response from api which is in json*/ 
                let data = response.json();
                return data;
            })
            .then(function(data){/*then we call a function passing data extracted from api to extract values which we need*/ 
                weather.temperature.value = Math.floor(data.main.temp - KELVIN);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
            })
            .then(function(){/*then we called a callback function to call our display function*/ 
                displayWeather();
            });
}

//display weather
function displayWeather(){
    imgElement.innerHTML = `<img src = "icons/${weather.iconId}.png" />`;
    tempElement.innerHTML = `${weather.temperature.value}॰C`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city},${weather.country}`;
}

//c to f function
function celciusToFahrenheit(temperature){
    return (temperature*9/5)+32;
}

//add event handler on temperature element
tempElement.addEventListener('click',function(){
    if(weather.temperature.value===undefined)return;

    if(weather.temperature.unit==='celcius'){
    const fahrenheit = Math.floor(celciusToFahrenheit(weather.temperature.value));
    tempElement.innerHTML = `${fahrenheit}॰F`;
    weather.temperature.unit='fahrenheit';
}else{
    tempElement.innerHTML = `${weather.temperature.value}॰C`;
    weather.temperature.unit='celcius';
}
});