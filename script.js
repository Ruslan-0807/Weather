const weatherCard = document.getElementById("weatherCard");
const info = document.getElementById("info");
const place = document.getElementById("place");
const temperatureItem = document.getElementById("temperature");
const wind = document.getElementById("wind");
const forecast = document.getElementById("forecast");
console.log(forecast);
// https://www.geojs.io/docs/v1/endpoints/geo/
// https://get.geojs.io/v1/ip/geo.json

// киньте fetch запрос по адресу и получите данные о своей геолокации
// из пришедших данных вам понадобится широта, долгота и город

// используйте асинхронную функцию и async / await
// положите данные в переменные latitude, longitude, city

// ! 18:05

async function loadWeather() {
  const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const obj = await res.json();
  // * можно присвоить данные переменным по очереди
  // const latitude = obj.latitude
  // const longitude = obj.longitude
  // const city = obj.city
  // * или использовать синтаксис деструктуризации
  // * и положить данные в переменные по ключам
  const { latitude, longitude, city, country } = obj;
  console.log(latitude, longitude, city, country);

  // сделайте fetch запрос по адресу:
  // https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true
  // замените значения широты и долготы в запросе, используя данные из предыдущей API
  // получите значения и положите в переменные:
  // температуру, скорость ветра и weathercode

  // обратите внимание на вложенность!

  // не забудьте что API ждет от вас третий параметр current_weather со значением true

  // ! до 18:50

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  // в запросе после вопросительного знака мы передаем переменные и их значения
  // latitude=52.52
  // longitude=13.41
  // current_weather=true
  const data = await response.json();
  // деструктуризацию производим несколько раз, т.к наши данные вложены глубже
  // вначале достаем объект current_weather из data
  const { current_weather } = data;
  // после объявляем переменные по ключам объекта current_weather
  const { windspeed, winddirection, weathercode, temperature } =
    current_weather;

  forecast.textContent = getWeatherDesc(weathercode);
  info.textContent = "Our forecast is: ";

  place.textContent = `${city}, ${country}`;
  temperatureItem.textContent =
    temperature + " " + data.current_weather_units.temperature;
  wind.textContent = windspeed + " " + data.current_weather_units.windspeed;

  // сделаем функцию, которая расшифровывает weathercode
  // назовем ее getWeatherDesc
  // используйте switch case
  // положите в переменную результат применения этой функции к вашим данным по weathercode

  // https://open-meteo.com/en/docs
  // найти таблицу с расшифровкой можно через cntrl+f в браузере
  // по ссылке сверху - ищите wmo weather

  // ! до 19:30
  function getWeatherDesc(code) {
    switch (code) {
      case 0:
        return "Clear sky";
      case 1:
        return "Mainly clear,";
      case 2:
        return "Partly cloudy";
      case 3:
        return "Overcast";
      case 45:
        return "Fog";
      case 48:
        return "Depositing rime fog";
      case 51:
        return "Light drizzle";
      case 53:
        return "Moderate drizzle";
      case 55:
        return "Dense intensity drizzle";
      case 56:
        return "Light freezing Drizzle";
      case 57:
        return "Dense intensity Freezing Drizzle";
      case 61:
        return "Slight rain";
      case 63:
        return "Moderate rain";
      case 65:
        return "Heavy intensity rain";
      case 66:
        return "Light Freezing Rain";
      case 67:
        return "Heavy Freezing Rain";
      case 71:
        return "Slight Snow fall";
      case 73:
        return "Moderate Snow fall";
      case 75:
        return "Heavy Snow fall";
      case 77:
        return "Snow grains";
      case 80:
        return "Slight Rain showers";
      case 81:
        return "Moderate Rain showers";
      case 82:
        return "Violent Rain showers";
      case 85:
        return "Slight Snow showers";
      case 86:
        return "Heavy Snow showers";
      case 95:
        return "Thunderstorm moderate";
      case 96:
        return "Thunderstorm slight";
      case 99:
        return "Thunderstorm slight";
    }
  }

  async function fatchData() {
    const response = await fetch(
      "https://www.stadtrundfahrt-leipzig.de/sehenswuerdigkeiten/?gad_source=1&gclid=CjwKCAiA6KWvBhAREiwAFPZM7sAMlCMfXVKxlfu3hHYFtfhfmjVl2hBIDt1Jkbb5hjIVzS9wji4-pRoCMMEQAvD_BwE.json"
    );
    const data = await response.json();
    console.lod(data);
  }
  fatchData();
}

loadWeather();
