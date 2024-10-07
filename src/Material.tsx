import { useMemo, useRef } from "react";
import { DataTexture, ShaderMaterial } from "three";

import fragmentShader from "./shaders/fragment.glsl?raw";
import vertexShader from "./shaders/vertex.glsl?raw";
import { useFrame } from "@react-three/fiber";

export default function Material() {
  const width = 200;
  const height = 200;
  const world: boolean[] = GenWorld(width, height);
  const texture = new DataTexture(GenData(world), width, height);
  texture.needsUpdate = true;

  const myShader = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }), []
  );

  useFrame(() => {
    if (myShader.current) {
      StepWorld(width, height, world);
      myShader.current.uniforms.uTexture.value.image.data = GenData(world);
      texture.needsUpdate = true;
    }
  });

  return (<shaderMaterial
    ref={myShader}
    fragmentShader={fragmentShader}
    vertexShader={vertexShader}
    uniforms={uniforms} />
  );
}

function GenWorld(width: number, height: number): boolean[] {
  const size = width * height;
  const world = [];
  for (let i = 0; i < size; i++) {
    world[i] = Math.random() >= 0.5
  }
  return world;
}

function StepWorld(width: number, height: number, world: boolean[]) {
  const oldWorld = world.slice()
  for (let i = 0; i < world.length; i++) {
    const neighbors = CountNeighbors(width, height, oldWorld, i);
    if (oldWorld[i]) {
      world[i] = neighbors == 2 || neighbors == 3
    }
    else {
      world[i] = neighbors == 3
    }
  }
}

function CountNeighbors(width: number, height: number, world: boolean[], i: number): number {
  const x = i % width;
  const y = Math.floor(i / width);
  let neighbors = 0
  if (CheckCell(width, height, world, x - 1, y + 1)) {
    neighbors += 1;
  }
  if (CheckCell(width, height, world, x, y + 1)) {
    neighbors += 1;
  }
  if (CheckCell(width, height, world, x + 1, y + 1)) {
    neighbors += 1;
  }
  if (CheckCell(width, height, world, x - 1, y)) {
    neighbors += 1;
  }
  if (CheckCell(width, height, world, x + 1, y)) {
    neighbors += 1;
  }
  if (CheckCell(width, height, world, x - 1, y - 1)) {
    neighbors += 1;
  }
  if (CheckCell(width, height, world, x, y - 1)) {
    neighbors += 1;
  }
  if (CheckCell(width, height, world, x + 1, y - 1)) {
    neighbors += 1;
  }

  return neighbors;
}

function CheckCell(width: number, height: number, world: boolean[], x: number, y: number): boolean {
  return world[(y % height) * width + (x % width)]
}

function GenData(world: boolean[]) {
  const data = new Uint8Array(4 * world.length);
  for (let i = 0; i < world.length; i++) {
    const stride = i * 4;
    if (world[i]) {
      data[stride] = 255;
      data[stride + 1] = 255;
      data[stride + 2] = 255;
      data[stride + 3] = 255;
    }
    else {
      data[stride] = 0;
      data[stride + 1] = 0;
      data[stride + 2] = 0;
      data[stride + 3] = 255;
    }
  }
  return data;
}