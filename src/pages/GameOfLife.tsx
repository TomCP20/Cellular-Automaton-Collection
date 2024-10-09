import { Canvas } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import { Button } from "../components/Button";
import { PausePlayButton } from "../components/PausePlayButton";
import { SizeDropdown } from "../components/SizeDropdown";
import { GameOfLifeMesh } from "../meshes/GameOfLifeMesh";
import World from "../World";

export function GameOfLife() {
  const [size, setSize] = useState(200);
  const world = useRef(new World(size, size));
  const play = useRef(false);
  const step = useRef(false);
  useEffect(() => {
    world.current = new World(size, size);
  }, [size]);
  return (
    <div className="h-auto flex p-0">
      <div className="flex-1 self-center text-center" />
      <div className="size-[800px] text-center self-center">
        <Canvas orthographic camera={{ left: -1, right: 1, bottom: -1, top: 1 }}>
          <GameOfLifeMesh world={world} play={play} step={step} />
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
  );
}
