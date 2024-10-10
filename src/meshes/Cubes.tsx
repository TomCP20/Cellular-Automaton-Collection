import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Color } from "three";

export function Cubes({ size, world, setWorld }: Readonly<{ size: number; world: boolean[][][]; setWorld: React.Dispatch<React.SetStateAction<boolean[][][]>>; }>) {
  useFrame(() => {
    setWorld(stepWorld(size, world));
  })
  const index = Array.from(Array(size), (_e, i) => { return i });
  return (
    <Instances limit={size * size * size}>
      <boxGeometry />
      <meshBasicMaterial />
      
      {index.map((x) => {
        return <>
          {index.map((y) => {
            return <>
              {index.map((z) => {
                return world[x][y][z] ? <Instance key={`${x}${y}${z}`} color={new Color(x/size, y/size, z/size)} scale={1 / size} position={[getPos(x, size), getPos(y, size), getPos(z, size)]} /> : null
              })}</>
          })}</>
      })}
    </Instances>
  );
}

function getPos(n: number, size: number): number {
  return (n - (size - 1) / 2) / size;
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