import {FC, useReducer} from "react";
import {emptyGrid, reducer} from "./reducer";
import {Cell} from "./cell.tsx";


export const ConnectFour: FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    grid: emptyGrid(),
    player: Math.random() < 0.5 ? "Player 1" : "Player 2",
    winner: null
  });

  return (
    <div className="flex flex-col items-center justify-center my-8">
      {state.winner ?
        <p className="text-lg text-green-600">Winner: {state.winner}</p> :
        <p className="text-lg">Current Player: {state.player}</p>}
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
