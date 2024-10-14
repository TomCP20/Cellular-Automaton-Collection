import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { Color, InstancedMesh, Object3D } from "three";
import ThreeDWorld from "../simulation/ThreeDWorld";

export default function ThreeDGameOfLifeMesh({ size, world }: Readonly<{ size: number; world: ThreeDWorld; }>) {
  const meshRef = useRef<InstancedMesh>(null!);
  const tempObject = useMemo(() => new Object3D(), []);
  const offset = (1/(size*2)) + (-1/2);

  useEffect(() => {
    if (meshRef == null) return;
    if (meshRef.current == null) return;
    UpdateMesh(size, tempObject, world, meshRef);
  }, [size, tempObject, world]);

  useFrame(() => {
    if (world.changed) {
      UpdateMesh(size, tempObject, world, meshRef);
      world.changed = false;
    }
  })
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, size * size * size]} scale={1/size} position={[offset, offset, offset]}>
      <boxGeometry args={[1, 1, 1]}></boxGeometry>
      <meshBasicMaterial />
    </instancedMesh>
  );
}

function UpdateMesh(size: number, tempObject: Object3D, world: ThreeDWorld, meshRef: MutableRefObject<InstancedMesh>) {
  let i = 0;
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        const worldindex = world.GetIndex(x, y, z);
        if (world.state[worldindex]) {
          tempObject.position.set(x, y, z);
          tempObject.updateMatrix();
          meshRef.current.setMatrixAt(i, tempObject.matrix);
          meshRef.current.setColorAt(i, new Color(x / size, y / size, z / size));
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