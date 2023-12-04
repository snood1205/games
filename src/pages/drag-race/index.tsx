import {FC, useEffect, useState} from "react";
import {Container, Sprite, Stage, Text} from "@pixi/react";
import {TextStyle} from "pixi.js";

interface Coordinates {
  x: number
  y: number
}

const style = new TextStyle({
  align: 'center',
  fontSize: 50,
  fill: ['#ffffff', '#00ff99'], // gradient
  stroke: '#01d27e',
  wordWrap: true,
  wordWrapWidth: 440,
})

const determineNextKey = (nextKey: string) => {
  switch (nextKey) {
    case "a":
      return "f";
    case "f":
      return "a";
    case "j":
      return ";";
    case ";":
      return "j";
  }
  return nextKey;
}

export const DragRace: FC = () => {
  const [topDriverPosition, setTopDriverPosition] = useState<Coordinates>({x: 0, y: 125})
  const [bottomDriverPosition, setBottomDriverPosition] = useState<Coordinates>({x: 0, y: 425})
  const [topNextKey, setTopNextKey] = useState<string>("a")
  const [bottomNextKey, setBottomNextKey] = useState<string>("j")
  const [winner, setWinner] = useState<string>()

  const checkForWinner = () => {
    // Tie goes to the top driver
    if (topDriverPosition.x >= 746) {
      setTopDriverPosition(position => ({...position, x: 775}))
      setWinner("top")
      return true
    }
    if (bottomDriverPosition.x >= 746) {
      setBottomDriverPosition(position => ({...position, x: 775}))
      setWinner("bottom")
      return true
    }
    return false
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (winner != null || checkForWinner()) return;
    if (event.key === topNextKey) {
      setTopNextKey(determineNextKey)
      setTopDriverPosition((position) => ({...position, x: position.x + 4}));
    } else if (event.key === bottomNextKey) {
      setBottomNextKey(determineNextKey)
      setBottomDriverPosition((position) => ({...position, x: position.x + 4}));
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  })

  return (
    <Stage>
      <Container height={600} width={800}>
        {winner != null && (
          <Text text={`Player ${winner === "top" ? 1 : 2} wins!`} height={100} width={200} x={300} y={250}
                style={style}/>)}
        <Sprite image="red-car.png" {...topDriverPosition} height={50} width={50}/>
        <Sprite image="blue-car.png" {...bottomDriverPosition} height={50} width={50}/>
      </Container>
    </Stage>
  )
}