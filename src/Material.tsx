import { useMemo, useRef } from "react";
import { DataTexture, ShaderMaterial } from "three";

import fragmentShader from "./shaders/fragment.glsl?raw";
import vertexShader from "./shaders/vertex.glsl?raw";

export default function Material() {
    const texture = GenTexture();
    texture.needsUpdate = true;

    const myShader = useRef<ShaderMaterial>(null);

    const uniforms = useMemo(
        () => ({
            uTexture: { value: texture },
        }), [texture]
    );

    return (<shaderMaterial
        ref={myShader}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms} />
    );
}

function GenTexture() {
    const width = 100;
    const height = 100;
    const size = width * height;
    const data = new Uint8Array(4 * size);
    for (let i = 0; i < size; i++) {
      const stride = i * 4;
      if (Math.random() >= 0.5) {
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
    return new DataTexture(data, width, height);
  }