/*Variáveis e Seleção de Elementos*/
const apiKey = "6758670e0df5cfa6577aca5ead0c99a5";
const apiCountryURL = "https://flagsapi.com/BR/shiny/64.png/";

const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// FUNÇÕES
const getWeatherData = async(city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

  const res = await fetch(apiWeatherURL);
  const data = await res.json();  

  return data
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
};

// EVENTOS
searchBtn.addEventListener("click", async (e) => {

  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
});

  cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      const city = e.target.value;

      showWeatherData(city);
    }

  })




/* API Key: 6758670e0df5cfa6577aca5ead0c99a5 

https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=6758670e0df5cfa6577aca5ead0c99a5

*/

/*
{"coord":{"lon":139,"lat":35},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":302.77,"feels_like":309.77,"temp_min":300.8,"temp_max":302.77,"pressure":1009,"humidity":82},"visibility":10000,"wind":{"speed":3.17,"deg":78,"gust":4.6},"clouds":{"all":3},"dt":1692581747,"sys":{"type":2,"id":2019346,"country":"JP","sunrise":1692562083,"sunset":1692610020},"timezone":32400,"id":1851632,"name":"Shuzenji","cod":200}
*/