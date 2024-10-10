import { Instance, Instances } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Object3D, InstancedMesh } from "three";

export function Cubes() {
  const size = 5;
  const temp = new Object3D();
  const instancedMeshRef = useRef<InstancedMesh>(null!);
  const world: boolean[][][] = [];
  for (let x = 0; x < size; x++) {
    world[x] = []
    for (let y = 0; y < size; y++) {
      world[x][y] = []
      for (let z = 0; z < size; z++) {
        world[x][y][z] = Math.random() >= 0.5;
      }
    }
  }
  useEffect(() => {
    // Set positions
    if (instancedMeshRef.current) {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          for (let z = 0; z < size; z++) {
            const i = x * size * size + y * size + z;
            temp.position.set((x - (size - 1) / 2) / size, (y - (size - 1) / 2) / size, (z - (size - 1) / 2) / size);
            temp.updateMatrix();
            instancedMeshRef.current.setMatrixAt(i, temp.matrix);
          }
        }
      }

      // Update the instance
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });
  const index = Array.from(Array(size), (_e, i) => { return i });
  return (
    <Instances limit={size * size * size}>
      <boxGeometry />
      <meshStandardMaterial />
      {index.map((x) => {
        return <>
          {index.map((y) => {
            return <>
              {index.map((z) => {
                return world[x][y][z] ? <Box key={x * size * size + y * size + z} size={size} position={[x, y, z]} /> : null
              })}</>
          })}</>
      })}
    </Instances>
  );
}
function Box({ size, position }: Readonly<{ size: number; position: [number, number, number]; }>) {
  const [x, y, z] = position;
  return (
    <Instance color="red" scale={1 / size} position={[(x - (size - 1) / 2) / size, (y - (size - 1) / 2) / size, (z - (size - 1) / 2) / size]} />
  );
}

