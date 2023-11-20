import {Dispatch, FC, MouseEventHandler, SetStateAction, useState} from "react";
import {Color} from "./shared";

interface Props {
  currentGuess: Color[];
  setCurrentGuess: Dispatch<SetStateAction<Color[]>>;
}

const toBackgroundColor = (color: Color): string => {
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
  }
};

export const CurrentGuess: FC<Props> = ({currentGuess, setCurrentGuess}: Props) => {
  const [selectedColor, setSelectedColor] = useState<Color>("red");
  const handleClickBuilder = (index: number): MouseEventHandler<HTMLDivElement> => () => {
    setCurrentGuess(currentGuess => {
      currentGuess[index] = selectedColor;
      return currentGuess;
    });
  };

  return (
    <div className="flex items-center justify-center">
      {currentGuess.map((color, index) => (
        <div key={index} className={`w-8 h-8 rounded-full border-2 ${toBackgroundColor(color)}`}
             onClick={handleClickBuilder(index)}/>
      ))}
      <div className="flex flex-col">
        <div className="flex">
          {(["red", "yellow", "green", "blue", "pink", "grey"] as Color[]).map((color) => (
            <div className={`w-8 h-8 rounded-full border-2 ${toBackgroundColor(color)}`} key={color}
                 onClick={() => setSelectedColor(color)}/>
          ))}
        </div>
      </div>
    </div>
  );
};