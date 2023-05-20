import { useState } from "react";

const Button = ({ handleClick, title }) => (
  <button onClick={handleClick}>{title}</button>
);

const VoteCount = ({ vote }) => <div>has {vote} votes.</div>;

const HighVoteStat = ({ highestVoted, highestVote }) => {
  if (highestVote !== 0) {
    return (
      <div>
        <div>{highestVoted}</div>
        <div> has {highestVote} votes</div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));
  const [largestVote, setLargestVote] = useState(0);
  const [mostVoted, setMostVoted] = useState("");

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * anecdotes.length);
    setSelected(number);
  };

  const vote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    for (let i = 0; i < copy.length; i++) {
      if (copy[i] > largestVote) {
        setLargestVote(copy[i]);
        setMostVoted(anecdotes[i]);
      }
    }
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
        <VoteCount vote={points[selected]} />
        <Button handleClick={vote} title="vote" />
        <Button handleClick={generateRandomNumber} title="next anecdote" />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <HighVoteStat highestVoted={mostVoted} highestVote={largestVote} />
      </div>
    </div>
  );
};

export default App;
