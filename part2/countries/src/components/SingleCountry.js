import Language from "./Language";

const SingleCountry = ({ country }) => (
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
      <img src={country.flags.png} alt="country flag" />
    </div>
  </div>
);

export default SingleCountry;
