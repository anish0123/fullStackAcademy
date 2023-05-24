import Language from "./Language";
import ApiService from "../services/Api";
import { useState, useEffect } from "react";

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState("");
  const api_key = process.env.REACT_APP_API_KEY;

  const fetchWeather = () => {
    ApiService.getWeather(country.latlng[0], country.latlng[1], api_key).then(
      (weather) => {
        setWeather([weather]);
        setWeatherIcon(weather.weather[0].icon);
      }
    );
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (weather.length === 0) {
    console.log(weather)
    return (<></>)
  } else {
    console.log(weather);
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <div>
          <h3>languages: </h3>
          <ul>
            {Object.values(country.languages).map((language) => (
              <Language language={language} key={language} />
            ))}
          </ul>
          <img src={country.flags.png} alt="country flag" />
        </div>
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>temperature {(weather[0].main.temp).toFixed(2)} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt="weathericon"
          />
          <p> wind {weather[0].wind.speed} m/s</p>
        </div>
      </div>
    );
  }
};

export default SingleCountry;
