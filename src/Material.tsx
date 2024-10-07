import { useMemo } from "react";
import { DataTexture, ShaderMaterial } from "three";

import fragmentShader from "./shaders/fragment.glsl?raw";
import vertexShader from "./shaders/vertex.glsl?raw";


export default function Material({texture, shaderRef}: Readonly<{texture: DataTexture, shaderRef: React.RefObject<ShaderMaterial>}>) {

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }), []
  );

  

  return (<shaderMaterial
    ref={shaderRef}
    fragmentShader={fragmentShader}
    vertexShader={vertexShader}
    uniforms={uniforms} />
  );
}