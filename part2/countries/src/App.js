import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      const countries = res.data.map((c) => ({
        name: c.name.common,
        languages: c.languages ? Object.values(c.languages) : [],
        capital: c.capital ? c.capital[0] : null,
        flag: c.flags.svg,
        area: c.area,
        capitalCoords: c.capitalInfo ? c.capitalInfo.latlng : null,
      }));
      // console.log(countries.filter((c) => !(c.languages.length && c.capital)));
      setAllCountries(countries);
    });
  }, []);

  const handleQueryChange = (e) => {
    setSelectedCountry(null);
    setQuery(e.target.value);
  };

  const country = allCountries.find(
    (c) => c.name.toLowerCase() === query.toLowerCase()
  );

  const matchingCountries =
    country ||
    allCountries.filter(
      (c) => query && c.name.toLowerCase().includes(query.toLowerCase())
    );

  const selectCountry = (idx) =>
    setSelectedCountry(matchingCountries.find((c, i) => i === idx));

  return (
    <div>
      <Filter query={query} onQueryChange={handleQueryChange} />
      {selectedCountry ? (
        <Country {...selectedCountry} />
      ) : country ? (
        <Country {...country} />
      ) : !matchingCountries.length && query ? (
        <p>no matches found</p>
      ) : matchingCountries.length === 1 ? (
        <Country {...matchingCountries[0]} />
      ) : matchingCountries.length <= 10 ? (
        <CountriesList
          onSelectCountry={selectCountry}
          countries={matchingCountries.map((c) => c.name)}
        />
      ) : (
        <TooManyCountries />
      )}
    </div>
  );
};

const Filter = ({ query, onQueryChange }) => (
  <div>
    find countries <input value={query} onChange={onQueryChange} />
  </div>
);

const TooManyCountries = () => <p>Too many matches, specify another filter</p>;

const CountriesList = ({ countries, onSelectCountry }) => (
  <ul>
    {countries.map((c, i) => (
      <li key={c}>
        {c} <button onClick={() => onSelectCountry(i)}>show</button>
      </li>
    ))}
  </ul>
);

const Country = ({ name, languages, capital, area, flag, capitalCoords }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (capitalCoords) {
      const [lat, lon] = capitalCoords;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((r) =>
          setWeather({
            temp: r.data.main.temp,
            wind: r.data.wind.speed,
            description: r.data.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${r.data.weather[0].icon}@2x.png`,
          })
        );
    }
  }, [capitalCoords]);

  return (
    <div>
      <h2>{name}</h2>
      <table>
        <tbody>
          <tr>
            <th align="left">capital</th>
            <td>{capital}</td>
          </tr>
          <tr>
            <th align="left">area</th>
            <td>{area}</td>
          </tr>
        </tbody>
      </table>
      <h4>languages:</h4>
      <ul>
        {languages.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <p>
        <img src={flag} alt={`${name}'s flag`} width={150} />
      </p>
      {weather && (
        <>
          <h3>Weather in {capital}</h3>
          <p>temperature {weather.temp} Celsius</p>
          <p>
            <img src={weather.icon} alt={weather.description} />
          </p>
          <p>wind: {weather.wind}m/s</p>
        </>
      )}
    </div>
  );
};

export default App;
