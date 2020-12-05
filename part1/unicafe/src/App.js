import React, {useState} from 'react'
import './App.css'
import Statistics from './Statistics'
import Button from './Button'

function App() {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const all = good + neutral + bad;

    return (
        <div>
            <h3>give feedback</h3>

            <Button setter={() => setGood(good+1)} text={'good'} />
            <Button setter={() => setNeutral(neutral+1)} text={'neutral'} />
            <Button setter={() => setBad(bad+1)} text={'bad'} />

            <h3>statistics</h3>

            { (all > 0) ? (
                <Statistics good={good} neutral={neutral} bad={bad} all={all} />
            ) : (
                <p>No feedback given</p>
            )}
        </div>
    )
}

export default App;
