import React, {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'},
        {name: 'Bello Tela'},
        {name: 'Stella Hela'},
        {name: 'Jella Fela'}
    ])
    const [personsShown, setPersonsShown] = useState(persons)

    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [filter, setFilter] = useState('');

    const handleNameChange = (evt) => {
        setNewName(evt.target.value);
    }

    const handlePhoneChange = (evt) => {
        setNewPhone(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if(persons.some((person) => {
            return person.name === newName;
        })){
            alert(`${newName} is already added to phonebook`)
            return;
        }

        setPersons(
            persons.concat({
                name: newName,
                number: newPhone
            })
        )
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
            <div>
                filter shown with: <input value={filter} onChange={handleFilterChange}/>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newPhone} onChange={handlePhoneChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {personsShown.map((person) => {
                return (
                    <p key={person.name}>{person.name} {person.number}</p>
                )
            })}

            <h5>debug: {filter}</h5>
            <h5>debug: {JSON.stringify(personsShown)}</h5>
        </div>
    )
}

export default App
