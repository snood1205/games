import {FC} from "react";

interface Props {
  newGame: () => void;
  winnerOrDraw: boolean;
}

export const NewGameButton: FC<Props> = ({newGame, winnerOrDraw}: Props) => (
  winnerOrDraw && (
    <button
      className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      onClick={newGame}>
      New Game
    </button>
  )
);