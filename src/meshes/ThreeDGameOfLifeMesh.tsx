import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { Color, InstancedMesh, Object3D } from "three";

export function ThreeDGameOfLifeMesh({ size, world }: Readonly<{ size: number; world: boolean[][][]; }>) {
  const meshRef = useRef<InstancedMesh>(null!);
  const tempObject = useMemo(() => new Object3D(), []);

  useEffect(() => {
    if (meshRef == null) return;
    if (meshRef.current == null) return;
    UpdateMesh(size, tempObject, world, meshRef);
  }, [size, tempObject, world]);

  useFrame(() => {
    UpdateMesh(size, tempObject, world, meshRef);
  })
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, size*size*size]}>
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
        const id = i++;
        tempObject.position.set(getPos(x, size), getPos(y, size), getPos(z, size));
        const scale = world[x][y][z] ? 1 / size : 0;
        tempObject.scale.set(scale, scale, scale);
        tempObject.updateMatrix();
        meshRef.current.setMatrixAt(id, tempObject.matrix);
        meshRef.current.setColorAt(id, new Color(x / size, y / size, z / size));
      }
    }
  }
  meshRef.current.instanceMatrix.needsUpdate = true;
}

function getPos(n: number, size: number): number {
  return (n - (size - 1) / 2) / size;
}