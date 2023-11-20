import {FC} from "react";

interface Props {
  draw: boolean;
  player: "X" | "O";
  winner: "X" | "O" | null;
  winnerOrDraw: boolean;
}

export const TopText: FC<Props> = ({draw, player, winner, winnerOrDraw}: Props) => (
  winnerOrDraw ? (
    <h1 className="text-lg font-bold">{draw ? "Draw" : `Winner: ${winner}`}</h1>
  ) : (
    <h1 className="text-lg font-bold">Turn: {player}</h1>
  )
);