import React, {useState} from 'react';
import './App.css';

const App = (props) => {
    const {anecdotes} = props;
    const [selected, setSelected] = useState(0);

    const getRandomQuote = () => {
        const idx = Math.floor(Math.random() * 100) % anecdotes.length;
        setSelected(idx);
    }

    return (
        <div>
            {props.anecdotes[selected]}

            <div>
                <button onClick={getRandomQuote}>
                    next anecdote
                </button>
            </div>
        </div>
    )
}

export default App;
