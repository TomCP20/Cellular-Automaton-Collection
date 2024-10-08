import { useRef } from "react";
import { GameOfLife } from "./GameOfLife";
import "./style.css"
import { Canvas } from "@react-three/fiber"
import World from "./World";
import { PausePlayButton } from "./PausePlayButton";

export default function App() {
  const width = 200;
  const height = 200;
  const world = useRef(new World(width, height))
  const play = useRef(true);
  const step = useRef(false);
  return (
    <div>
      <h1>Game of Life</h1>
      <Canvas orthographic camera={{ left: -1, right: 1, bottom: -1, top: 1 }} style={{ background: "black" }}>
        <GameOfLife world={world} play={play} step={step} />
      </Canvas>
      <PausePlayButton play={play} />
      <button onClick={() => world.current.Reset()}>reset</button>
      <button onClick={() => world.current.Clear()}>clear</button>
      <button onClick={() => step.current = true}>step</button>
    </div>
  );
}