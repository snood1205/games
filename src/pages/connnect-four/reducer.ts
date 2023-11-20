import {checkForWin} from "./check-for-win";

type Player = "Red player" | "Blue player";
export type GridSpot = Player | null;
type GridRow = [GridSpot, GridSpot, GridSpot, GridSpot, GridSpot, GridSpot, GridSpot];
export type Grid = [GridRow, GridRow, GridRow, GridRow, GridRow, GridRow];

export interface State {
  grid: Grid;
  winner: Player | null;
  draw: boolean;
  player: Player;
}

interface DropAction {
  type: "drop";
  column: number;
  player: Player;
}

export type GridAction = DropAction | { type: "reset" };

const isDropAction = (action: GridAction): action is DropAction => action.type === "drop";
export const emptyGrid = () => Array(6).fill(null).map(() => Array(7).fill(null) as GridRow) as Grid;

export const reducer = (state: State, action: GridAction): State => {
  const nextPlayer = state.player === "Red player" ? "Blue player" : "Red player";
  if (action.type === "reset") return {player: nextPlayer, grid: emptyGrid(), winner: null, draw: false};
  if (isDropAction(action)) return drop(action, state, nextPlayer);
  return state;
};


const drop = (action: DropAction, state: State, nextPlayer: Player): State => {
  const grid = state.grid.map(row => [...row] as GridRow) as Grid;
  const row = firstEmptyRow(action.column, grid);

  if (row !== -1) { // Check if there's an available row
    grid[row][action.column] = action.player;
    const winner = checkForWin(row, action.column, grid) ? action.player : null;
    const draw = winner === null && grid.every(row => row.every(cell => cell !== null));
    return {player: winner ? state.player : nextPlayer, grid, winner, draw};
  }
  return state;
};


const firstEmptyRow = (column: number, grid: Grid): number => {
  for (let row = 5; row >= 0; row--)
    if (grid[row][column] === null)
      return row;
  throw new Error("Column is full");
};