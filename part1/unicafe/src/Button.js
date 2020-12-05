import React from 'react'

const Button = props => {
    // save clicks of each button to its own state
    const {
        setter, text
    } = props;

    return (
        <button className={'action-btn'} onClick={setter}> {text}
        </button>
    )
};

export default Button
