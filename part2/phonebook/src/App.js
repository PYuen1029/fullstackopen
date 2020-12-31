import React, {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState('');

    const handleChange = (evt) => {
        setNewName(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        setPersons(
            persons.concat({
                name: newName
            })
        )
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => {
                return (
                    <p key={person.name}>{person.name}</p>
                )
            })}

            <h5>debug: {newName}</h5>
        </div>
    )
}

export default App
