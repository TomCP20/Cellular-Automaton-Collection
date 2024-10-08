import { useEffect, useRef, useState } from "react";
import { GameOfLife } from "./GameOfLife";
import "./style.css"
import { Canvas } from "@react-three/fiber"
import World from "./World";
import { PausePlayButton } from "./PausePlayButton";

export default function App() {
  const [size, setSize] = useState(200);
  const world = useRef(new World(size, size))
  const play = useRef(false);
  const step = useRef(false);
  useEffect(() => {
    world.current = new World(size, size);
  }, [size])
  return (
    <div>
      <h1>Game of Life</h1>
      <Canvas orthographic camera={{ left: -1, right: 1, bottom: -1, top: 1 }} style={{ background: "black" }}>
        <GameOfLife world={world} play={play} step={step} />
      </Canvas>
      <PausePlayButton play={play} />
      <button onClick={() => world.current.Noise()}>noise</button>
      <button onClick={() => world.current.Clear()}>clear</button>
      <button onClick={() => step.current = true}>step</button>
      <label>
        Size:{" "}
        <select value={size} onChange={e => setSize(+e.target.value)}>
          <option value={10}>10x10</option>
          <option value={20}>20x20</option>
          <option value={50}>50x50</option>
          <option value={100}>100x100</option>
          <option value={200}>200x200</option>
          <option value={400}>400x400</option>
        </select>
      </label>
    </div>
  );
}