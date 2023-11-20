interface Props {
  square: "X" | "O" | null;
  rowIndex: number;
  columnIndex: number;
  winnerOrDraw: boolean;
  handleClick: (rowIndex: number, columnIndex: number) => void;
}

export const Square = ({square, rowIndex, columnIndex, winnerOrDraw, handleClick}: Props) => {
  return (
    <button
      key={columnIndex}
      className="w-16 h-16 border border-gray-400 flex items-center justify-center font-bold text-xl rounded"
      onClick={() => { handleClick(rowIndex, columnIndex); }}
      disabled={square != null || winnerOrDraw}>
      {square}
    </button>
  );
};
