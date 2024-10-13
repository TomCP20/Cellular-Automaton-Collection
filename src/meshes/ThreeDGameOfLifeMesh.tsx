import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { Color, InstancedMesh, Object3D } from "three";

export default function ThreeDGameOfLifeMesh({ size, world, update }: Readonly<{ size: number; world: boolean[][][]; update: MutableRefObject<boolean>; }>) {
  const meshRef = useRef<InstancedMesh>(null!);
  const tempObject = useMemo(() => new Object3D(), []);

  useEffect(() => {
    if (meshRef == null) return;
    if (meshRef.current == null) return;
    UpdateMesh(size, tempObject, world, meshRef);
  }, [size, tempObject, world]);

  useFrame(() => {
    if (update) {
      UpdateMesh(size, tempObject, world, meshRef);
      update.current = false;
    }
  })
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, size * size * size]}>
      <boxGeometry args={[1, 1, 1]}></boxGeometry>
      <meshBasicMaterial />
    </instancedMesh>
  );
}

function UpdateMesh(size: number, tempObject: Object3D, world: boolean[][][], meshRef: MutableRefObject<InstancedMesh>) {
  let i = 0;
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        if (world[x][y][z]) {
          tempObject.position.set(getPos(x, size), getPos(y, size), getPos(z, size));
          const scale = 1 / size;
          tempObject.scale.set(scale, scale, scale);
          tempObject.updateMatrix();
          meshRef.current.setMatrixAt(i, tempObject.matrix);
          meshRef.current.setColorAt(i, new Color((x / size) % 1, y / size, z / size));
          i++;
        }
      }
    }
  }
  meshRef.current.count = i;
  meshRef.current.instanceMatrix.needsUpdate = true;
  if (meshRef.current.instanceColor) {
    meshRef.current.instanceColor.needsUpdate = true
  }

}

function getPos(n: number, size: number): number {
  return (n - (size - 1) / 2) / size;
}