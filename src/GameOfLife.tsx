import { DataTexture, ShaderMaterial } from "three";
import Material from "./Material";
import World from "./World";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function GameOfLife({ world }: Readonly<{ world: React.MutableRefObject<World> }>) {

    const texture = new DataTexture(world.current.GenData(), world.current.width, world.current.height);
    texture.needsUpdate = true;

    const shaderRef = useRef<ShaderMaterial>(null);

    useFrame(() => {
        if (shaderRef.current) {
            world.current.Step();
            shaderRef.current.uniforms.uTexture.value.image.data = world.current.GenData();
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
