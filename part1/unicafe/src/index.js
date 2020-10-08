import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const FeedbackButton = ({ clickHandler, text }) => {
    return <button onClick={clickHandler}>{text}</button>;
};

const Statistic = ({ text, value }) => {
    return (
        <tbody>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </tbody>
    );
};

const Statistics = ({ good, bad, neutral }) => {
    let all = good + bad + neutral;
    let average = (good - bad) / all || 0;
    let positive = good / (all * 0.01) || 0;
    if (all === 0) return <p>No feedback given</p>;
    return (
        <table>
            <Statistic text={'good'} value={good} />
            <Statistic text={'neutral'} value={neutral} />
            <Statistic text={'bad'} value={bad} />
            <Statistic text={'all'} value={all} />
            <Statistic text={'average'} value={average} />
            <Statistic text={'positive'} value={positive.toString() + ' %'} />
        </table>
    );
};

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>
            <FeedbackButton
                clickHandler={() => setGood(good + 1)}
                text="good"
            />
            <FeedbackButton
                clickHandler={() => setNeutral(neutral + 1)}
                text="neutral"
            />
            <FeedbackButton clickHandler={() => setBad(bad + 1)} text="bad" />

            <Statistics good={good} bad={bad} neutral={neutral} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
