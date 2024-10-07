import { DataTexture, ShaderMaterial } from "three";
import Material from "./Material";
import World from "./World";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function GameOfLife({ world, play, step }: Readonly<{ world: React.MutableRefObject<World>, play: React.MutableRefObject<boolean>, step: React.MutableRefObject<boolean> }>) {

    const texture = new DataTexture(world.current.GenData(), world.current.width, world.current.height);
    texture.needsUpdate = true;

    const shaderRef = useRef<ShaderMaterial>(null);

    useFrame(() => {
        if (play.current || step.current) {
            world.current.Step();
            step.current = false
        }

        if (shaderRef.current) {
            shaderRef.current.uniforms.uTexture.value.image.data = world.current.GenData();
            shaderRef.current.uniforms.uTexture.value.needsUpdate = true;
            world.current.changed = false;
        }
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <Material texture={texture} shaderRef={shaderRef} />
        </mesh>
    );
}
