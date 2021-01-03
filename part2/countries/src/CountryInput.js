import React from "react";

const CountryInput = props => {
    const {filter, setFilterLowercase} = props

    const handleFilterChange = (evt) => {
        setFilterLowercase(evt.target.value);
    }

    return (
        <div>
            <span>find countries</span>
            <input type="text" value={filter} onChange={handleFilterChange}/>
        </div>
    )
};

export default CountryInput;
