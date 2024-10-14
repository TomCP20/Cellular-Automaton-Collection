import { Edges, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import ThreeDGameOfLifeMesh from "../meshes/ThreeDGameOfLifeMesh";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import DropDown from "../ui/DropDown";
import ThreeDWorld from "../simulation/ThreeDWorld";
import { BoxGeometry } from "three";

export default function ThreeDGameOfLife() {
  const [size, setSize] = useState(20);
  const [world, setWorld] = useState(new ThreeDWorld(size))
  const [step, setStep] = useState(false);
  const [play, setPlay] = useState(false);
  

  useEffect(() => {
    setWorld(new ThreeDWorld(size));
  }, [size]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (play || step) {
        world.Step();
        setStep(false);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [play, size, step, world])
  return (
    <div className="h-auto flex p-0">
      <div className="flex-1 self-center text-center" />
      <div className="size-[800px] text-center self-center">
        <Canvas className="bg-black"  gl={{preserveDrawingBuffer: true}}>
          <PerspectiveCamera makeDefault position={[-1.3, 1, -1.3]} />
          <ThreeDGameOfLifeMesh size={size} world={world} />
          <Edges lineWidth={2} scale={1} threshold={15} color="white" geometry={new BoxGeometry()} />
          <OrbitControls />
        </Canvas>
      </div>
      <div className="flex-1 self-start text-left verti">
        <Button onClick={() => setPlay(!play)}>{play ? "pause" : "play"}</Button><br />
        <Button onClick={() => setStep(true)} disabled={play}>step</Button><br />
        <Button onClick={() => world.GenWorld()}>reset</Button><br />
        <DropDown val={size} setVal={setSize} vals={[5, 10, 15, 20, 25, 30, 40, 50, 75, 100]} label="Size:" optionLabel={(s) => `${s}x${s}x${s}`} />
      </div>
    </div>
  );
}