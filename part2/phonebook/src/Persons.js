import React from "react";
import personsApi from "./services/persons";

const Persons = (props) => {
    const {personsShown, setPersons, persons} = props;

    const handleDelete = (id, name) => {
        window.confirm(`You sure you want to delete ${name}?`)

        personsApi.remove(id)
            .then(response => {
                setPersons(
                    persons.filter(person => person.id !== id)
                )
            })
    }

    return (
        <>
            {personsShown.map((person) => {
                return (
                    <div key={person.name}>
                        <p style={{
                            display: "inline-block",
                            marginRight: "10px"
                        }}>{person.name} {person.number}</p>
                        <button onClick={() => handleDelete(person.id, person.name)}>
                            Delete
                        </button>
                    </div>

                )
            })}
        </>
    )
}

export default Persons
