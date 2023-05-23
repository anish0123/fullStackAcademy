import Country from "./Country";
import Language from "./Language";

const Countries = ({ countries }) => {
    if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (countries.length <= 10 && countries.length > 1) {
      return (
        <ul>
          {countries.map((country) => (
            <Country country={country} key={country.name.common} />
          ))}
        </ul>
      );
    } else if (countries.length === 1) {
      console.log("only one country");
      const country = countries[0];
      console.log("flag", country.flags.png);
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital {country.capital[0]}</p>
          <p>Area {country.area}</p>
          <div>
            <h3>languages: </h3>
            <ul>
              {Object.getOwnPropertyNames(country.languages).map((language) => (
                <Language language={language} key={language} />
              ))}
            </ul>
            <img src={country.flags.png} alt="country flag"/>
          </div>
        </div>
      );
    }
  };

  export default Countries;