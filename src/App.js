
import Die from './Die'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid' 
import Confetti from 'react-confetti'


function App() {
  //set the dice as soon as it loads
  const [dice, setDice] = useState(allNewDice())
  //represents if the user has won or not
  const [tenzies, setTenzies] = useState(false)
 //counts number of rolls it takes to win
  const [count, setCount] = useState(0)

 
  //Checks if the user has won
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
   
  }, [dice])

  //add a new die object to the dice array
  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  //creates a new die object
  function generateNewDie() {
     return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
  }

  //function that runs when the user clicks the roll button to generate new dice
  function rollDice() {
    if(!tenzies) {
      setCount(oldCount => oldCount + 1)
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
              die : 
              generateNewDie()  
      }))
    } else {
      //resets the game
      setTenzies(false)
      setDice(allNewDice())
      setCount(0)
    }
  }

  //flip the isHeld property on the object in the array that was clicked, based on the "id" prop passed into the function
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
    }))
  }


  //map over the dice array and return a string of the dice
  const diceElements = dice.map(die => (
    <Die 
       value={die.value} 
       isHeld={die.isHeld}
       key={die.id} 
       holdDice={() => holdDice(die.id)}
       />
    ))


  return (
    <main>
    {tenzies && <Confetti />}
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    {!tenzies && <p className="num--rolls">Number of Rolls: {count}</p>}
    {tenzies && <p className="rolls--to--win">It took {count} rolls to win 🏆</p>}
      <div className="dice--container">
        {diceElements}
      </div>
      <button 
        className="roll--dice"
        onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}


export default App
