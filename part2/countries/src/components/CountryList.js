const CountryList = ({country, handleClick}) => {
    return (
        <div key={country.name.common}>
              <p>
                {country.name.common}
                <button onClick={handleClick}>show</button>
              </p>
            </div>
    )
}

export default CountryList;