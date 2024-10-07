import { useMemo, useRef } from "react";
import { DataTexture, ShaderMaterial } from "three";
import { useFrame } from "@react-three/fiber";

import fragmentShader from "./shaders/fragment.glsl?raw";
import vertexShader from "./shaders/vertex.glsl?raw";
import World from "./World";


export default function Material() {
  const width = 200;
  const height = 200;
  const world: World = new World(width, height);
  const texture = new DataTexture(world.GenData(), width, height);
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
      world.Step();
      myShader.current.uniforms.uTexture.value.image.data = world.GenData();
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