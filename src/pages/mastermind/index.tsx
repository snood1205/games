import {FC, useState} from "react";
import {CurrentGuess} from "./current-guess";
import {Color} from "./shared";
import {PastGuess} from "./past-guess.tsx";

const generateSolution = () => {
  const colors: Color[] = ["red", "yellow", "green", "blue", "pink", "grey"];
  const solution: Color[] = [];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    solution[i] = colors[randomIndex];
    colors.splice(randomIndex, 1);
  }
  return solution;
};

export const Mastermind: FC = () => {
  const solution = generateSolution();
  const [guesses, setGuesses] = useState<Color[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<Color[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const checkGuess = () => {
    setGuesses(guesses => [...guesses, currentGuess]);
    for (let i = 0; i < 4; i++)
      if (currentGuess[i] !== solution[i])
        return setCurrentGuess([]);
    setGameOver(true);
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="mb-4">
        <p className="text-lg text-green-600">Mastermind</p>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {guesses.map((guess, index) => (
          <PastGuess guess={guess} solution={solution} key={index}/>
        ))}
        <CurrentGuess currentGuess={currentGuess} setCurrentGuess={setCurrentGuess}/>
      </div>
      <button
        className="mt-4 px-2 py-1 font-medium text-white bg-blue-500 rounded hover:bg-blue-700 text-sm"
        onClick={checkGuess}
        disabled={gameOver || currentGuess.length !== 4}
      >
        Guess
      </button>
    </div>
  );
};