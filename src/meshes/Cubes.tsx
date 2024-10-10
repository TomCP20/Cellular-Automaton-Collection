import { useRef, useEffect } from "react";
import { Object3D, InstancedMesh } from "three";

export function Cubes() {
  const size = 10;
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
            temp.position.set((x - (size - 1) / 2)/size, (y - (size - 1) / 2)/size, (z - (size - 1) / 2)/size);
            temp.updateMatrix();
            instancedMeshRef.current.setMatrixAt(i, temp.matrix);
          }
        }
      }

      // Update the instance
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });
  return (
    <instancedMesh ref={instancedMeshRef} args={[null, null, size * size * size]}>
      <boxGeometry args={[1/size, 1/size, 1/size]} />
      <meshBasicMaterial color={"red"} />
    </instancedMesh>
  );
}
