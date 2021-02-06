import React from "react";

const PersonsForm = (props) => {
    const {
        newName,
        setNewName,
        newPhone,
        setNewPhone,
        handleSubmit
    } = props;

    const handleNameChange = (evt) => {
        setNewName(evt.target.value);
    }

    const handlePhoneChange = (evt) => {
        setNewPhone(evt.target.value);
    }

    return (
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
    )
}

export default PersonsForm
