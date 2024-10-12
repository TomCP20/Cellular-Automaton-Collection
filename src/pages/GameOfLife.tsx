import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { GameOfLifeMesh } from "../R3F/GameOfLifeMesh";
import World from "../World";
import { Button } from "../components/Button";
import { SizeDropdown } from "../components/SizeDropdown";

export function GameOfLife() {
  const world = useRef(new World(200, [3], [2, 3]));
  const [step, setStep] = useState(false);
  const [play, setPlay] = useState(false);

  const [size, setSize] = useState(world.current.size);

  useEffect(() => {
    world.current = new World(size, [3], [2, 3]);
  }, [size, world]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (play || step) {
        world.current.Step();
        setStep(false);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [play, step, world])

  return (
    <div className="h-auto flex p-0">
      <div className="flex-1 self-center text-center" />
      <div className="size-[800px] text-center self-center">
      <Canvas orthographic camera={{ left: -1, right: 1, bottom: -1, top: 1 }} className="bg-black"  gl={{preserveDrawingBuffer: true}}>
          <GameOfLifeMesh world={world} />
        </Canvas>
      </div>
      <div className="flex-1 self-start text-left verti">
        <Button onClick={() => setPlay(!play)}>{play ? "pause" : "play"}</Button><br />
        <Button onClick={() => setStep(true)} disabled={play}>step</Button><br />
        <Button onClick={() => world.current.Noise()}>noise</Button><br />
        <Button onClick={() => world.current.Clear()}>clear</Button><br />
        <SizeDropdown size={size} setSize={setSize} />
      </div>
    </div>
  );
}