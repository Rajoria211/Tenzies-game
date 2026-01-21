import Die from "./components/die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function App() {
  const [dice, setDice] = React.useState(() => generateAllNewDice());

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        id={die.id}
        hold={hold}
      />
    );
  });

  function hold(id) {
    setDice((prevDice) => {
      const newDice = [...prevDice];
      newDice.map((die) => {
        if (id === die.id) {
          die.isHeld = !die.isHeld;
        }
      });
      return newDice;
    });
  }

  function generateAllNewDice() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      let randomNumber = Math.ceil(Math.random() * 6);
      arr.push({ id: nanoid(), value: randomNumber, isHeld: false });
    }
    return arr;
  }

  function rollDices() {
    if (gameWon === false) {
      setDice((prevDice) => {
        const newDice = [...prevDice];
        newDice.map((die) => {
          if (die.isHeld === false) {
            die.value = Math.ceil(Math.random() * 6);
          }
        });
        return newDice;
      });
    } else {
      setDice(generateAllNewDice());
    }
  }

  const { width, height } = useWindowSize();

  return (
    <main>
      {gameWon && <Confetti width={width} height={height} />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulation! You Won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button ref={buttonRef} className="roll-dice-button" onClick={rollDices}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
