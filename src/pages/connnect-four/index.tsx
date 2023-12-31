import {FC, useReducer, useState} from "react";
import {emptyGrid, reducer} from "./reducer";
import {Cell} from "./cell.tsx";


export const ConnectFour: FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    grid: emptyGrid(),
    player: Math.random() < 0.5 ? "Red player" : "Blue player",
    winner: null,
    draw: false
  });
  const [redPlayerName, setRedPlayerName] = useState("Red player");
  const [bluePlayerName, setBluePlayerName] = useState("Blue player");
  const currentPlayerName = () => state.player === "Red player" ? redPlayerName : bluePlayerName;
  const currentColorClass = () => state.player === "Red player" ? "text-red-500" : "text-blue-500";

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Red player's name"
          className="px-3 py-2 mr-2 border rounded"
          onChange={(event) => setRedPlayerName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Blue player's name"
          className="px-3 py-2 border rounded"
          onChange={(event) => setBluePlayerName(event.target.value)}
        />
      </div>
      {state.winner ?
        <p className="text-lg text-green-600">Winner: {state.winner}</p> :
        state.draw ?
          <p className="text-lg text-green-600">Draw</p> :
          <p className={`text-lg ${currentColorClass()}`}>{currentPlayerName()}'s turn!</p>}
      <h1 className="text-2xl font-bold mb-4">Connect Four</h1>
      <div className="grid grid-cols-7 gap-1">
        {state.grid.map((row, rowIndex) => (
          row.map((cell, columnIndex) => (
            <Cell cell={cell} columnIndex={columnIndex} dispatch={dispatch} rowIndex={rowIndex} state={state}
                  key={`${rowIndex}-${columnIndex}`}/>
          ))
        ))}
      </div>
      <div className="mt-4">
        <button
          className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            dispatch({type: "reset"});
          }}>
          {state.winner == null ? "Reset" : "New"} Game
        </button>
      </div>
    </div>
  );
};
