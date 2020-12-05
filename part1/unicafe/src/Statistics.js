import React from 'react'
import './Statistics.css'

const Statistics = props => {
    // save clicks of each button to its own state
    const {
        good, neutral, bad, all
    } = props;

    const average = all > 0 ? ((good - bad) / all) : 0;
    const positive = all > 0 ? (good / all) * 100 : 0;

    return (
        <table>
            <tbody>
                <tr>
                    <td>good</td>
                    <td>{good}</td>
                </tr>
                <tr>
                    <td>neutral</td>
                    <td>{neutral}</td>
                </tr>
                <tr>
                    <td>bad</td>
                    <td>{bad}</td>
                </tr>
                <tr>
                    <td>all</td>
                    <td>{all}</td>
                </tr>
                <tr>
                    <td>average</td>
                    <td>{average}</td>
                </tr>
                <tr>
                    <td>positive</td>
                    <td>{positive}</td>
                </tr>
            </tbody>
        </table>
    )
};

export default Statistics
