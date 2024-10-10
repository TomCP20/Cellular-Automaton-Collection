import { Edges, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Cubes } from "../meshes/Cubes";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";

export function ThreeDGameOfLife() {
  const size = 20;
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
          <PerspectiveCamera makeDefault position={[-1.3, 1, -1.3]} />
          <Cubes size={size} world={world} />
          <mesh>
            <boxGeometry />
            <meshBasicMaterial transparent={true} opacity={0} />
            <Edges lineWidth={2} scale={1} threshold={15} color="white" />
          </mesh>
          <OrbitControls />
        </Canvas>
      </div>
      <div className="flex-1 self-start text-left verti">
        <Button onClick={() => setWorld(GenWorld(size))}>reset</Button><br />
      </div>
    </div>
  );
}

function GenWorld(size: number): boolean[][][] {
  const world: boolean[][][] = Array(size);
  for (let x = 0; x < size; x++) {
    world[x] = Array(size);
    for (let y = 0; y < size; y++) {
      world[x][y] = Array(size);
      for (let z = 0; z < size; z++) {
        world[x][y][z] = Math.random() >= 0.75;
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
        const neighbors: number = countNeighbors(size, world, x, y, z);
        if (world[x][y][z]) {
          newworld[x][y][z] = (5 <= neighbors && neighbors <= 7);
        }
        else {
          newworld[x][y][z] = (6 <= neighbors && neighbors <= 6);
        }
      }
    }
  }
  return newworld;
}

function countNeighbors(size: number, world: boolean[][][], x: number, y: number, z: number) {
  let neighbors = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (dx === 0 && dy === 0 && dz === 0) {
          continue;
        }
        if (world[(x + dx + size) % size][(y + dy + size) % size][(z + dz + size) % size]) {
          neighbors++;
        }
      }
    }
  }
  return neighbors;
}