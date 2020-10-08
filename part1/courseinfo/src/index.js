import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
};
const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => {
                return <Part part={part} />;
            })}
        </div>
    );
};
const Total = ({ parts }) => {
    return (
        <p>
            Number of exercises{' '}
            {parts.reduce((sum, current) => {
                return sum + current.exercises;
            }, 0)}
        </p>
    );
};

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
            },
            {
                name: 'State of a component',
                exercises: 14,
            },
        ],
    };

    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
