import { Edges, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Cubes } from "../meshes/Cubes";
import { useEffect, useState } from "react";

export function ThreeDGameOfLife() {
  const size = 10;
  const [world, setWorld] = useState(GenWorld(size))

  useEffect(() => {
    const interval = setInterval(() => {
      setWorld(stepWorld(size, world));
    }, 500);

    return () => clearInterval(interval);
  }, [world])
  return (
    <div className="h-auto flex p-0">
      <div className="flex-1 self-center text-center" />
      <div className="size-[800px] text-center self-center">
        <Canvas className="bg-black">
          <PerspectiveCamera makeDefault position={[-2, -2, -2]} />
          <Cubes size={size} world={world} />
          <mesh>
            <boxGeometry />
            <meshBasicMaterial transparent={true} opacity={0} />
            <Edges lineWidth={2} scale={1} threshold={15} color="white" />
          </mesh>
          <OrbitControls />
        </Canvas>
      </div>
      <div className="flex-1 self-start text-left verti" />
    </div>
  );
}

function GenWorld(size: number) {
  const world: boolean[][][] = Array(size);
  for (let x = 0; x < size; x++) {
    world[x] = Array(size);
    for (let y = 0; y < size; y++) {
      world[x][y] = Array(size);
      for (let z = 0; z < size; z++) {
        world[x][y][z] = Math.random() >= 0.5;
      }
    }
  }
  return world;
}

function stepWorld(size: number, world: boolean[][][]): boolean[][][] {
  const newworld: boolean[][][] = Array(size);
  for (let x = 0; x < size; x++) {
    newworld[x] = Array(size);
    for (let y = 0; y < size; y++) {
      newworld[x][y] = Array(size);
      for (let z = 0; z < size; z++) {
        newworld[x][y][z] = !world[x][y][z];
      }
    }
  }
  return newworld;
}