import React, {useState, useEffect} from 'react'
import Filter from "./Filter";
import PersonsForm from "./PersonsForm";
import Persons from "./Persons";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([])
    const [personsShown, setPersonsShown] = useState(persons)

    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
                setPersonsShown(response.data)
            })
    }, [])

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (persons.some((person) => {
            return person.name === newName;
        })) {
            alert(`${newName} is already added to phonebook`)
            return;
        }

        setPersons(
            persons.concat({
                name: newName,
                number: newPhone
            })
        )
        setPersonsShown(persons.concat({
            name: newName,
            number: newPhone
        }))
    }

    const handleFilterChange = (evt) => {
        const newFilter = evt.target.value
        setFilter(newFilter)

        if (newFilter.length <= 0) {
            setPersonsShown(persons);
            return;
        }

        setPersonsShown(persons.filter((val) => val.name.toLowerCase().indexOf(newFilter) !== -1));
    };

    return (
        <div style={{marginLeft: '20px'}}>
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
            <Persons personsShown={personsShown}/>

            {/*<p>*/}
            {/*    <strong>DEBUG</strong>*/}
            {/*    {JSON.stringify(persons)}*/}
            {/*</p>*/}

        </div>
    )
}

export default App
