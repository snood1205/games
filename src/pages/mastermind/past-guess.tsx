import {Color} from "./shared";
import {FC} from "react";

interface Props {
  guess: Color[];
  solution: Color[];
}

type Response = "bg-red-500" | "bg-[#fff]" | null;

export const PastGuess: FC<Props> = ({guess, solution}: Props) => {
  const responseRow: Response[] = guess.map((color, index) => {
    if (color === solution[index]) return "bg-red-500";
    if (solution.includes(color)) return "bg-[#fff]";
    return null;
  });

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center">
        {guess.map((color, index) => (
          <div key={index}
               className={`w-8 h-8 rounded-full border-2 ${color === "grey" ? "bg-gray-500" : `bg-${color}-500`}`}/>
        ))}
      </div>
      <div className="flex justify-center items-center">
        {responseRow.map((response, index) => (
          <div key={index}
               className={`w-8 h-8 rounded-full border-2 ${response}`}/>
        ))}
      </div>
    </div>
  );
};