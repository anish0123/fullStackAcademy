import axios from "axios";

const getCountries = () => {
  const request = axios.get(
    "https://studies.cs.helsinki.fi/restcountries/api/all"
  );

  return request.then((response) => response.data);
};

const getCountry = (name) => {
  const request = axios.get(
    `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
  );
  return request.then((response) => response.data);
};

const getWeather = (lat, lon, apiKey) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  return request.then((response) => response.data);
};

export default { getCountries, getCountry, getWeather };
