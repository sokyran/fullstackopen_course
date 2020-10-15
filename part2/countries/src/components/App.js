import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const Countries = ({ countries, handleShow }) => {
  if (countries.length > 10) {
    return <p>Too many countries, specify another filter</p>;
  }
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  return countries.map((country) => {
    return (
      <div>
        {country.name}{' '}
        <button value={country.name} onClick={handleShow}>
          show
        </button>
      </div>
    );
  });
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>

      <div>
        <img src={country.flag} width="200" alt="undefined"></img>
      </div>
      <Weather city={country.capital} />
    </div>
  );
};

const Weather = ({ city }) => {
  let cleanupFunction = false;
  const [weather, setWeather] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
      );
      console.log(response.data);
      if (!cleanupFunction) setWeather(response.data);
    };
    fetchData();

    return () => (cleanupFunction = true);
  }, [city]);

  if (!Object.keys(weather).length) {
    return null;
  }
  return (
    <div>
      <p>temperature: {weather.current.temperature} Celsius </p>
      <img
        src={weather.current.weather_icons[0]}
        alt="weather"
        width="120"
      ></img>
      <p>
        wind: {weather.current.wind_speed} mph direction{' '}
        {weather.current.wind_dir}{' '}
      </p>
    </div>
  );
};

const Search = ({ search, handleSearch }) => {
  return <input value={search} onChange={handleSearch} />;
};

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    let cleanupFunction = false;
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      if (!cleanupFunction) setCountries(response.data);
    });
    return () => (cleanupFunction = true);
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value) {
      setCountriesToShow(
        countries.filter((country) =>
          country.name
            .toLowerCase()
            .startsWith(event.target.value.toLowerCase())
        )
      );
    }
  };

  const handleShow = (event) => {
    setCountriesToShow(
      countries.filter((country) => country.name === event.target.value)
    );
  };

  return (
    <div>
      <h3>Find countries</h3>
      <Search search={search} handleSearch={handleSearch} />
      <Countries countries={countriesToShow} handleShow={handleShow} />
    </div>
  );
};

export default App;
