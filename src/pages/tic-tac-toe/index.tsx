import {FC, useState} from "react";
import {Square} from "./square";
import {TopText} from "./top-text";
import {NewGameButton} from "./new-game-button";

type SquareValue = "X" | "O" | null;
type Row = [SquareValue, SquareValue, SquareValue]
type Board = [Row, Row, Row];

const checkWinner = (board: Board): SquareValue => {
  if (board[0][0] != null && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] != null && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return board[0][2];
  }
  for (let index = 0; index < 3; index++) {
    if (board[index][0] != null && board[index][0] === board[index][1] && board[index][0] === board[index][2]) {
      return board[index][0];
    }
    if (board[0][index] != null && board[0][index] === board[1][index] && board[0][index] === board[2][index]) {
      return board[0][index];
    }
  }
  return null;
};

const emptyBoard = (): Board => [[null, null, null], [null, null, null], [null, null, null]];

export const TicTacToe: FC = () => {
  const [board, setBoard] = useState<Board>(emptyBoard());
  const [player, setPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<SquareValue>(null);

  const handleClick = (row: number, column: number) => {
    const newBoard: Board = [...board];
    newBoard[row][column] = player;
    const winner = checkWinner(newBoard);
    if (winner != null) {
      setWinner(winner);
      return;
    }
    setPlayer(player === "X" ? "O" : "X");
    setBoard(newBoard);
  };

  const newGame = () => {
    setBoard(emptyBoard());
    setPlayer(winner === "X" ? "O" : "X");
    setWinner(null);
  };

  const draw = winner == null && board.every(row => row.every(square => square != null));
  const winnerOrDraw = winner != null || draw;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <TopText draw={draw} player={player} winner={winner} winnerOrDraw={winnerOrDraw}/>
      <div className="flex flex-col items-center justify-center">
        {board.map((row: Row, rowIndex: number) => (
          <div key={rowIndex} className="flex">
            {row.map((square: SquareValue, columnIndex) => (
              <Square key={`${rowIndex}${columnIndex}`} square={square} rowIndex={rowIndex} columnIndex={columnIndex}
                      winnerOrDraw={winnerOrDraw}
                      handleClick={handleClick}/>
            ))}
          </div>
        ))}
      </div>
      <NewGameButton newGame={newGame} winnerOrDraw={winnerOrDraw}/>
    </div>
  );
};

