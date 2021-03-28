import React from "react";
import personsApi from "./services/persons";

const Persons = (props) => {
    const {personsShown, setError, setPersons, persons} = props;

    const handleDelete = (id, name) => {
        window.confirm(`You sure you want to delete ${name}?`)

        personsApi.remove(id)
            .then(response => {
                setPersons(
                    persons.filter(person => person.id !== id)
                )
            }).catch(error => {
                setError(`${name} was not found on the server.`)

                personsApi.getAll()
                    .then(response => {
                        setPersons(response.data)
                    })
            })
    }

    return (
        <>
            {personsShown.map((person) => {
                return (
                    <div key={person.id}>
                        <p style={{
                            display: "inline-block",
                            marginRight: "10px"
                        }}>{person.name} {person.phoneno}</p>
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
