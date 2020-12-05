import React, {useState} from 'react';
import './App.css';

const App = (props) => {
    const {anecdotes} = props;
    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0));

    const vote = () => {
        const copy = [...points];
        copy[selected] += 1;
        setPoints(copy);
    }

    const getRandomQuote = () => {
        const idx = Math.floor(Math.random() * 100) % anecdotes.length;
        setSelected(idx);
    }

    const getMostUpvotedAnecdote = (idx=false) => {
        const mostPoints = points.reduce(function(carry, value){
            if (carry > value) {
                return carry;
            }
            return value;
        })

        if (idx) {
            return points.indexOf(mostPoints);
        }
        return mostPoints;

    }

    return (
        <div>
            <h3>anecdote of the day</h3>
            {anecdotes[selected]}
            <p>has {points[selected]} votes</p>
            <div>
                <button onClick={vote}>
                    vote
                </button>
                <button onClick={getRandomQuote}>
                    next anecdote
                </button>
            </div>

            <h3>anecdote with the most votes</h3>
            {anecdotes[getMostUpvotedAnecdote(true)]}
            <p>has {getMostUpvotedAnecdote()} votes</p>
        </div>
    )
}

export default App;
