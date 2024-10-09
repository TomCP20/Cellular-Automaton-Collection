import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { GameOfLifeMesh } from "../meshes/GameOfLifeMesh";
import World from "../World";
import { GameOfLifeUI } from "../components/GameOfLifeUI";

export function GameOfLife() {
  const world = useRef(new World(200));
  const play = useRef(false);
  const step = useRef(false);
  return (
    <div className="h-auto flex p-0">
      <div className="flex-1 self-center text-center" />
      <div className="size-[800px] text-center self-center">
        <Canvas orthographic camera={{ left: -1, right: 1, bottom: -1, top: 1 }} className="bg-black">
          <GameOfLifeMesh world={world} play={play} step={step} />
        </Canvas>
      </div>
      <div className="flex-1 self-start text-left verti">
        <GameOfLifeUI play={play} world={world} step={step} />
      </div>
    </div>
  );
}