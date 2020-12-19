import React from 'react';
import Part from "./Part";

const Content = ({ course }) => {
    const total = course.parts.reduce((carry, val) => {
        return carry + val.exercises;
    })

    return (
        <div>
            {course.parts && course.parts.map((part) => {
                return (
                    <Part part={part} />
                )
            })}
        </div>
    )
}

export default Content;
