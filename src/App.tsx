import { useEffect, useRef, useState } from "react";
import { GameOfLife } from "./GameOfLife";
import "./style.css"
import { Canvas } from "@react-three/fiber"
import World from "./World";
import { PausePlayButton } from "./components/PausePlayButton";
import { SizeDropdown } from "./components/SizeDropdown";
import { Button } from "./components/Button";

export default function App() {
  const [size, setSize] = useState(200);
  const world = useRef(new World(size, size))
  const play = useRef(false);
  const step = useRef(false);
  useEffect(() => {
    world.current = new World(size, size);
  }, [size])
  return (
    <>
      <h1 className="text-center">Game of Life</h1>
      <div className="h-auto flex p-0">
        <div className="flex-1 self-center text-center" />
        <div className="size-[800px] text-center self-center">
          <Canvas orthographic camera={{ left: -1, right: 1, bottom: -1, top: 1 }} >
            <GameOfLife world={world} play={play} step={step} />
          </Canvas>
        </div>
        <div className="flex-1 self-start text-left verti">
          <PausePlayButton play={play} /><br />
          <Button onClick={() => world.current.Noise()}>noise</Button><br />
          <Button onClick={() => world.current.Clear()}>clear</Button><br />
          <Button onClick={() => step.current = true}>step</Button><br />
          <SizeDropdown size={size} setSize={setSize} />
        </div>

      </div>
    </>
  );
}


