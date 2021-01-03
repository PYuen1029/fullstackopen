import React from 'react';
import './App.css';
import {useEffect, useState} from 'react';
import axios from "axios";


function App() {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])

    const handleFilterChange = (evt) => {
        setFilter(evt.target.value.toLowerCase());
    }

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then((response) => {
                console.group("DEBUG: Line 13");
                console.dir(response.data);
                console.groupEnd();
                setCountries(response.data);
            })
    }, [])

    const displayedCountries = countries.filter((country) => country.name.toLowerCase().indexOf(filter) !== -1);

    let result = (<span>TOO MANY RESULTS</span>);
    if (displayedCountries.length === 1) {
        let country = displayedCountries[0];

        result = (
            <div>
                <h3>{country.name}</h3>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h4>languages</h4>
                <ul>
                    {country.languages.map((val) => val.name)}
                </ul>
                <img src={country.flag} alt={country.name + 'Flag'} width={'150px'}/>
            </div>
        )
    } else if (displayedCountries.length < 10) {
        result = (
            <div>
                {displayedCountries.map((val) =>
                    (<p>{val.name}</p>)
                )}
            </div>
        )
    }

    return (
        <div>
            {/*find countries input*/}
            <div>
                <span>find countries</span>
                <input type="text" value={filter} onChange={handleFilterChange}/>
            </div>

            {/*results*/}
            <div>
                {result}
            </div>
        </div>
    );
}

export default App;
