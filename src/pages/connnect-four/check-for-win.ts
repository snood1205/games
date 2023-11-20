import {Grid} from "./reducer.ts";

export const checkForWin = (row: number, column: number, grid: Grid): boolean =>
  checkVerticalWin(row, column, grid) || checkHorizontalWin(row, column, grid) || checkDiagonalWin(row, column, grid);

const checkHorizontalWin = (row: number, column: number, grid: Grid): boolean => {
  let count = 0;
  for (const [, cell] of grid[row].entries()) {
    if (cell === grid[row][column]) {
      count++;
      if (count === 4) return true;
    } else {
      count = 0;
    }
  }
  return false;
};

const checkVerticalWin = (row: number, column: number, grid: Grid): boolean => {
  let count = 0;
  for (const [, rowArray] of grid.entries()) {
    if (rowArray[column] === grid[row][column]) {
      count++;
      if (count === 4) return true;
    } else {
      count = 0;
    }
  }
  return false;
};


const checkDiagonalWin = (row: number, column: number, grid: Grid): boolean => {
  return checkDiagonalLeftToRight(row, column, grid) || checkDiagonalRightToLeft(row, column, grid);
};

const checkDiagonalLeftToRight = (row: number, column: number, grid: Grid): boolean => {
  let count = 0;
  for (let i = -3; i <= 3; i++) {
    if (!(row + i < 0 || row + i >= grid.length || column + i < 0 || column + i >= grid[0].length)) {
      if (grid[row + i][column + i] === grid[row][column]) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }
  }
  return false;
};

const checkDiagonalRightToLeft = (row: number, column: number, grid: Grid): boolean => {
  let count = 0;
  for (let i = -3; i <= 3; i++) {
    if (!(row + i < 0 || row + i >= grid.length || column - i < 0 || column - i >= grid[0].length)) {
      if (grid[row + i][column - i] === grid[row][column]) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }
  }
  return false;
};
