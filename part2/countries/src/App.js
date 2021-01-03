import React from 'react';
import './App.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import CountryInput from "./CountryInput";

function App() {
    const [filter, setFilter] = useState('')
    const setFilterLowercase = (filter) => {
        setFilter(filter.toLowerCase())
    }

    const [countries, setCountries] = useState([])
    const [weatherData, setWeatherData] = useState({})

    const openWeatherApiKey = process.env.REACT_APP_OPENWEATHERMAP_KEY

    const handleCountrySelect = ((evt) => {
        let selectedCountry = evt.target.getAttribute('data-country-name').toLowerCase();
        setFilterLowercase(selectedCountry)
    })

    const displayedCountries = countries.filter((country) => country.name.toLowerCase().indexOf(filter) !== -1);

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then((response) => {
                setCountries(response.data);
            })
    }, [])

    useEffect(() => {
        if (displayedCountries.length === 1) {
            const country = displayedCountries[0];
//             axios.get(`http://localhost:3001/helsinki`)
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.name}&appid=${openWeatherApiKey}&units=metric`)
                .then((response) => {
                    setWeatherData(response.data)
                })
        }
    }, [displayedCountries.length])

    let result = (<span>TOO MANY RESULTS</span>);
    if (displayedCountries.length === 1) {
        let country = displayedCountries[0];
        result = (
            <div>
                <h3>{country.name}</h3>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h4>spoken languages</h4>
                <ul>
                    {country.languages.map((val) => (<li> {val.name} </li>))}
                </ul>
                <img src={country.flag} alt={country.name + 'Flag'} width={'150px'}/>

                {weatherData.main && (
                    <>
                        <h4>weather in {country.capital}, {country.name}</h4>
                        <p><strong>temperature:</strong> {weatherData.main.temp} Celsius</p>
                        <p><strong>Weather:</strong> {weatherData.weather[0].main} - {weatherData.weather[0].description}</p>
                        <p><strong>wind:</strong> {weatherData.wind.speed} mph
                            direction at {weatherData.wind.deg} degrees</p>
                    </>
                )}
            </div>
        )
    } else if (displayedCountries.length < 10) {
        result = (
            <div>
                {displayedCountries.map((val) =>
                    (
                        <p>{val.name}
                            <button onClick={handleCountrySelect} data-country-name={val.name}>show</button>
                        </p>
                    )
                )}
            </div>
        )
    }

    return (
        <div>
            <CountryInput filter={filter} setFilterLowercase={setFilterLowercase}/>
            <div>
                {result}
            </div>
        </div>
    );
}

export default App;
