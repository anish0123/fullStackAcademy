import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import ApiService from "./services/Api";

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
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div>
      find countries <input value={value} onChange={handleValueChange} />
      <div>
        <Countries countries={filteredCountries} />
      </div>
    </div>
  );
};

export default App;
