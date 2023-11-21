import {Dispatch, FC, MouseEventHandler, SetStateAction, useState} from "react";
import {Color} from "./shared";

interface Props {
  currentGuess: Color[];
  setCurrentGuess: Dispatch<SetStateAction<Color[]>>;
}

const toBackgroundColor = (color: Color | null): string => {
  switch (color) {
    case "red":
      return "bg-red-400";
    case "yellow":
      return "bg-amber-400";
    case "green":
      return "bg-emerald-400";
    case "blue":
      return "bg-sky-400";
    case "pink":
      return "bg-fuchsia-300";
    case "grey":
      return "bg-zinc-400";
    case null:
      return "bg-black";
  }
};

export const CurrentGuess: FC<Props> = ({currentGuess, setCurrentGuess}: Props) => {
  const [index, setIndex] = useState<number>(0);
  const handleClickBuilder = (color: Color): MouseEventHandler<HTMLDivElement> => () => {
    if (index >= 4) return;
    setCurrentGuess(currentGuess => {
      currentGuess[index] = color;
      return currentGuess;
    });
    setIndex(index => index + 1);
  };
  const filledGuess = currentGuess.length < 4 ? currentGuess.concat(Array(4 - currentGuess.length).fill(null)) : currentGuess;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex mb-4">
        {filledGuess.map((color, index) => (
          <div key={index} className={`w-8 h-8 rounded-full border-2 ${toBackgroundColor(color)}`}/>
        ))}
      </div>
      <div className="flex">
        {(["red", "yellow", "green", "blue", "pink", "grey"] as Color[]).map((color) => (
          <div className={`w-8 h-8 rounded-full border-2 ${toBackgroundColor(color)}`} key={color}
               onClick={handleClickBuilder(color)}/>
        ))}
      </div>
    </div>
  );
};