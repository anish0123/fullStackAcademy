import { useState, useEffect } from "react";
import axios from "axios";
import ApiService from "./services/Api";
import Language from "./components/Language";
import SearchBar from "./components/SearchBar";
import SingleCountry from "./components/SingleCountry";
import CountryList from "./components/CountryList";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const getCountries = () => {
    console.log("fetching countries");
    ApiService.getCountries().then((countries) => setCountries(countries));
  };

  useEffect(() => {
    getCountries();
  }, [value]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return (
      <>
        <SearchBar value={value} handleValueChange={handleValueChange} />
        <div>Too many matches, specify another filter</div>
      </>
    );
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <>
        <SearchBar value={value} handleValueChange={handleValueChange} />
        <div>
          {filteredCountries.map((country) => (
            <CountryList
              country={country}
              handleClick={() => setCountries([country])}
              key={country.name.common}
            />
          ))}
        </div>
      </>
    );
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <>
        <SearchBar value={value} handleValueChange={handleValueChange} />
        <SingleCountry country={country} />
      </>
    );
  }
};

export default App;
