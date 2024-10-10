import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Cubes } from "../meshes/Cubes";

export function ThreeDGameOfLife() {
  return (
    <div className="h-auto flex p-0">
      <div className="flex-1 self-center text-center" />
      <div className="size-[800px] text-center self-center">
        <Canvas className="bg-black">
          <ambientLight intensity={Math.PI / 2} />
          <Cubes />
          <OrbitControls />
        </Canvas>
      </div>
      <div className="flex-1 self-start text-left verti" />
    </div>
  );
}