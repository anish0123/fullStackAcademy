import { useState } from 'react'

const History = ({allClicks}) => {
  if(allClicks.length === 0) {
    return <div> <br />the app can be started by pressing left or right button</div>
  } else {
    return <div> <br /> {allClicks.join(" ")}</div>
  }
};

const DisplayClicks=({totalClicks}) => {
  if(totalClicks === 0) {
    return <div> <br /> No Buttons pressed </div>
  } else {
    return <div> <br /> {totalClicks}</div>
  }
};

const Button = ({handleClick, title}) => (
    <button onClick={handleClick}>
      {title}
    </button>
  );

 const App = () => {
  const [clicks, setClicks] = useState({left: 0, right: 0})
  const [allClicks, setAllClicks] = useState([]);
  const  [totalClicks, setTotalClicks] = useState(0);

const handleLeftClicks = (value) => {
  setClicks({
    ...clicks,
    left: value
  })
  setAllClicks(allClicks.concat("L"));
  const updatedLeft = clicks.left + 1;
  setTotalClicks(updatedLeft + clicks.right);

}

const handleRightClicks = () => {
  setClicks({
    ...clicks,
    right: clicks.right + 1,
  })
  setAllClicks(allClicks.concat("R"));
  const updatedRight = clicks.left + 1;
  setTotalClicks(updatedRight + clicks.right);
};

  return (
    <div>
      {clicks.left}
     <Button handleClick={() => {handleLeftClicks(clicks.left + 1)}} title="left"/>
     <Button handleClick={handleRightClicks} title="right"/>
      {clicks.right}
      <div>
       <History allClicks={allClicks}/>
        <DisplayClicks totalClicks={totalClicks}/>
      </div>
    </div>
  )
}
export default App;
