import {GridAction, GridSpot, State} from "./reducer";
import {Dispatch, FC} from "react";

interface Props {
  cell: GridSpot;
  columnIndex: number;
  dispatch: Dispatch<GridAction>;
  rowIndex: number;
  state: State;
}

const cellColorClass = (cell: GridSpot) => {
  if (cell === "Player 1") return "bg-red-500";
  if (cell === "Player 2") return "bg-blue-500";
  return "bg-gray-500";
};

export const Cell: FC<Props> = ({cell, columnIndex, dispatch, rowIndex, state}: Props) =>
  (<div key={`${rowIndex}-${columnIndex}`}
        className={`w-10 h-10 rounded-full border-2 ${cellColorClass(cell)} cursor-pointer`}
        onClick={() => {
          if (state.winner == null && cell == null) dispatch({
            type: "drop",
            column: columnIndex,
            player: state.player
          });
        }}>
    </div>
  );