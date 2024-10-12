import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Color, InstancedMesh, Object3D } from "three";

export function Cubes({ size, world }: Readonly<{ size: number; world: boolean[][][]; }>) {
  const meshRef = useRef<InstancedMesh>(null!);
  const tempObject = new Object3D();

  useEffect(() => {
    if (meshRef == null) return;
    if (meshRef.current == null) return;

    let i = 0;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          const id = i++;
          tempObject.position.set(getPos(x, size), getPos(y, size), getPos(z, size));
          tempObject.scale.set(1/size, 1/size, 1/size);
          tempObject.updateMatrix();
          meshRef.current.setMatrixAt(id, tempObject.matrix);
          meshRef.current.setColorAt(id, new Color(x/size, y/size, z/size));
        }
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [size]);

  useFrame(() => {
    let i = 0;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          const id = i++;
          tempObject.position.set(getPos(x, size), getPos(y, size), getPos(z, size));
          const scale = world[x][y][z] ? 1/size : 0;
          tempObject.scale.set(scale, scale, scale);
          tempObject.updateMatrix();
          meshRef.current.setMatrixAt(id, tempObject.matrix);
          meshRef.current.setColorAt(id, new Color(x/size, y/size, z/size));
        }
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  })
  return (
    <instancedMesh ref={meshRef} args={[null, null, size*size*size]}>
      <boxGeometry args={[1, 1, 1]}></boxGeometry>
      <meshBasicMaterial />
    </instancedMesh>
  );
}

function getPos(n: number, size: number): number {
  return (n - (size - 1) / 2) / size;
}