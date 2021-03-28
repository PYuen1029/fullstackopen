import React, {useState, useEffect} from 'react'
import Filter from "./Filter";
import PersonsForm from "./PersonsForm";
import Persons from "./Persons";
import personsApi from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [filter, setFilter] = useState('');
    const [error, setError] = useState('');

    // set personsShown to if filter then persons, else persons.filter filter
    const personsShown = filter.length > 0 ?
        persons.filter((val) => val.name.toLowerCase().indexOf(filter) !== -1) :
        persons;

    useEffect(() => {
        personsApi.getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const existingPerson = persons.find((person) => {
            return person.name === newName;
        })
        const newPerson = {
            name: newName,
            number: newPhone
        }

        if (existingPerson && window.confirm(`Do you want to update the record for ${existingPerson.name}`)) {
            if (existingPerson) {
                personsApi.update(existingPerson.id, newPerson)
                    .then(updatedPerson => {
                        setPersons(
                            persons.map(person => person.id === existingPerson.id ? updatedPerson.data : person)
                        )
                        setError('')
                    })
                    .catch(error => {
                        setError(error.response.data.error)
                    })
                return;
            }
        }

        // send request to the server to save
        personsApi.create(newPerson)
            .then(response => {
                const newPerson = response.data;
                setPersons(persons.concat(newPerson))
                setError('')
            })
            .catch(error => {
                setError(error.response.data.error);
            })
    }

    const handleFilterChange = (evt) => {
        const newFilter = evt.target.value
        setFilter(newFilter.toLowerCase());
    };

    const errorStyle = {
        backgroundColor: "#ff3d3d"
    }

    return (
        <div style={{marginLeft: '20px'}}>
            <div style={errorStyle}>
                <p>{error}</p>
            </div>

            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange}/>

            <PersonsForm
                newName={newName}
                setNewName={setNewName}
                newPhone={newPhone}
                setNewPhone={setNewPhone}
                handleSubmit={handleSubmit}
            />

            <h2>Numbers</h2>
            <Persons personsShown={personsShown}
                     setPersons={setPersons}
                     persons={persons}
                     setError={setError}
            />
        </div>
    )
}

export default App
