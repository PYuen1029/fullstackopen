import React from "react";

const Persons = (props) => {
    const {personsShown} = props;

    return (
        <>
            {personsShown.map((person) => {
                return (
                    <p key={person.name}>{person.name} {person.number}</p>
                )
            })}
        </>
    )
}

export default Persons
