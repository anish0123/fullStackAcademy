import { useState } from "react";

const Button = ({ handleClick, title }) => (
  <button onClick={handleClick}>{title}</button>
);

const StatisticLine = ({ value, title }) => {
  if (title === "positive") {
    return (
      <tr>
        <td>{title}</td>
        <td>{value} %</td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{title}</td>
        <td>{value}</td>
      </tr>
    );
  }
};

const Statistics = ({ feedback, sum, count }) => {
  if (count !== 0) {
    return (
      <div>
        <table>
          <tbody>
        <StatisticLine value={feedback.good} title="good" />
        <StatisticLine value={feedback.neutral} title="neutral" />
        <StatisticLine value={feedback.bad} title="bad" />
        <StatisticLine value={count} title="all" />
        <StatisticLine
          value={isNaN(sum / count) ? 0 : sum / count}
          title="average"
        />
        <StatisticLine
          value={
            isNaN((feedback.good * 100) / count)
              ? 0
              : (feedback.good * 100) / count
          }
          title="positive"
        />
        </tbody>
        </table>
      </div>
    );
  } else {
    return <div>No feedback given</div>;
  }
};

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });
  const [sum, setSum] = useState(0);
  const [count, setCount] = useState(0);

  const handleGoodClick = () => {
    const updatedFeedback = {
      ...feedback,
      good: feedback.good + 1,
    };
    setFeedback(updatedFeedback);
    setSum(feedback.good - feedback.bad + 1);
    setCount(count + 1);
  };
  const handleNeutralClick = () => {
    const updatedFeedback = {
      ...feedback,
      neutral: feedback.neutral + 1,
    };
    setFeedback(updatedFeedback);
    setCount(count + 1);
  };
  const handleBadClick = () => {
    const updatedFeedback = {
      ...feedback,
      bad: feedback.bad + 1,
    };
    setFeedback(updatedFeedback);
    setSum(feedback.good - feedback.bad - 1);
    setCount(count + 1);
  };
  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={handleGoodClick} title="good" />
        <Button handleClick={handleNeutralClick} title="neutral" />
        <Button handleClick={handleBadClick} title="bad" />
      </div>
      <h1>statistics</h1>
      <Statistics feedback={feedback} sum={sum} count={count} />
    </div>
  );
};

export default App;
