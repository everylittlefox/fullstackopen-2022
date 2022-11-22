import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <GiveFeedback
        incBad={() => setBad(bad + 1)}
        incGood={() => setGood(good + 1)}
        incNeutral={() => setNeutral(neutral + 1)}
      />
      {good || bad || neutral ? (
        <Statistics good={good} bad={bad} neutral={neutral} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const GiveFeedback = ({ incGood, incNeutral, incBad }) => (
  <div>
    <h2>give feedback</h2>
    <Button text="good" handleClick={incGood} />
    <Button text="neutral" handleClick={incNeutral} />
    <Button text="bad" handleClick={incBad} />
  </div>
);

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = (good * 100) / all;

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine value={good} text="good" />
          <StatisticLine value={neutral} text="neutral" />
          <StatisticLine value={bad} text="bad" />
          <StatisticLine value={all} text="all" />
          <StatisticLine value={average} text="average" />
          <StatisticLine value={`${positive} %`} text="positive" />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({text, value}) => <tr>
  <td>{text}</td>
  <td>{value}</td>
</tr>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

export default App;
