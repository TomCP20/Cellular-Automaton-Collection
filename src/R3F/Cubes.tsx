import { Instance, Instances } from "@react-three/drei";
import { Color } from "three";

export function Cubes({ size, world }: Readonly<{ size: number; world: boolean[][][]; }>) {
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