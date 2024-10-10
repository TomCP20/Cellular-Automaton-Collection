import { useRef, useEffect } from "react";
import { Object3D, InstancedMesh, Color } from "three";

export function Cubes() {
  const size = 10;
  const temp = new Object3D();
  const instancedMeshRef = useRef<InstancedMesh>(null!);
  useEffect(() => {
    // Set positions
    if (instancedMeshRef.current) {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          for (let z = 0; z < size; z++) {
            const i = x * size * size + y * size + z;
            temp.position.set(x - (size - 1) / 2, y - (size - 1) / 2, z - (size - 1) / 2);
            temp.updateMatrix();
            instancedMeshRef.current.setMatrixAt(i, temp.matrix);
            if ((x + y + z) % 2 === 0) {
              instancedMeshRef.current.setColorAt(i, new Color("red"));
            }
            else {
              instancedMeshRef.current.setColorAt(i, new Color("green"));
            }

          }
        }
      }

      // Update the instance
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });
  return (
    <instancedMesh ref={instancedMeshRef} args={[null, null, size * size * size]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
}
