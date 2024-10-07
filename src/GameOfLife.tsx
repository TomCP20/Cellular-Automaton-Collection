import { DataTexture, ShaderMaterial } from "three";
import Material from "./Material";
import World from "./World";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function GameOfLife({ width, height }: Readonly<{ width: number, height: number }>) {
    const world: World = new World(width, height);

    const texture = new DataTexture(world.GenData(), width, height);
    texture.needsUpdate = true;

    const shaderRef = useRef<ShaderMaterial>(null);

    useFrame(() => {
        if (shaderRef.current) {
            world.Step();
            shaderRef.current.uniforms.uTexture.value.image.data = world.GenData();
            shaderRef.current.uniforms.uTexture.value.needsUpdate = true;
        }
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <Material texture={texture} shaderRef={shaderRef} />
        </mesh>
    );
}
