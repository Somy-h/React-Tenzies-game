import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [startTime, setStartTime] = useState(-1);
  const [endTime, setEndTime] = useState(-1);
  const [bestTime, setBestTime] = useState(()=> Number.parseInt(JSON.parse(localStorage.getItem("tenzies")) || 0));
  const [rollNum, setRollNum] = useState(0);

  useEffect(() => {
    if (dice.every(die => die.isHeld)) {
      if (dice.every(die => dice[0].value === die.value)) {
        setTenzies(true);
        setEndTime(new Date().getTime());
        
        // cannot use directly endTime yet
        let diff = new Date().getTime() - startTime;
        //console.log("diff: " + diff)
        if (bestTime === 0 || diff < bestTime) {
          localStorage.setItem("tenzies", diff)
          setBestTime(prevTime => diff);

        }
        console.log("You won!");
      } else {
        console.log("No match");
      }
    }  
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function getRandom() {
    return Math.floor(Math.random()*6) + 1;
  }

  function generateNewDie() {
    return {id: nanoid(), value: getRandom(), isHeld:false}
  }

  
  const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
  ))

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      })
    )
  }

  function rollDice() {
    if (tenzies) {
      setStartTime(new Date().getTime());
      setDice(prevDice => allNewDice());
      setTenzies(false);
      setRollNum(0);
    }
    else {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }));
      setRollNum(prevNum => prevNum + 1);
      //console.log(rollNum)
    }
  }

  function handleStart(event) {
    event.target.classList.add("active");
    console.dir(event.target);
    //set game start time
    setStartTime(new Date().getTime());
  }

  //https://stackoverflow.com/questions/10804042/calculate-time-difference-with-javascript
  function getGameTime (diff) {
    //console.log(diff);
    const SEC = 1000, MIN = 60 * SEC, HRS = 60 * MIN
    const hrs = Math.floor(diff / HRS)
    const min = Math.floor((diff % HRS) / MIN).toLocaleString('en-US', {minimumIntegerDigits: 2})
    const sec = Math.floor((diff % MIN) / SEC).toLocaleString('en-US', {minimumIntegerDigits: 2})
    const ms = Math.floor(diff % SEC).toLocaleString('en-US', {minimumIntegerDigits: 4, useGrouping: false})
    
    return `${min}:${sec}::${ms}ms`
}


  return (
    <div className="App bg-[##0B2434] max-w-screen-sm w-full flex justify-center">
    
      <main className="bg-[#F5F5F5] rounded-md p-5 flex flex-col items-center justify-evenly">
      
        <div className={`game-start ${startTime > 0 ? "active" : ""} absolute w-full h-full flex justify-center items-center`}>
          <button onClick={handleStart} 
            className="rounded-lg bg-[#5035FF] text-white text-lg cursor-pointer shadow-lg focus:outline-none">Game Start</button>
        </div>
        
        <h1 className="text-4xl">Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="game-container">
          {diceElements}
        </div>
        <button 
          className="rounded-lg bg-[#5035FF] text-white text-md cursor-pointer focus:outline-none mt-4" 
          onClick={rollDice}
        >
        {tenzies ? "New Game" : `Roll ${rollNum}`}
        </button>
        {
          tenzies && <p>{getGameTime(endTime - startTime)}</p>
        }
        {
          bestTime !==0 && <p className="text-red-500">Best time: {getGameTime(bestTime)}</p>
        }
        
      </main>
      {
          tenzies && <Confetti width={window.innerWidth} height={window.innerHeight}/>
      }
    </div>
  )
}

export default App;
