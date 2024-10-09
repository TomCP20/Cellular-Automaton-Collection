import World from "../World";
import { useState } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";

export function GameOfLifeMesh({ world, play, step }: Readonly<{ world: React.MutableRefObject<World>, play: React.MutableRefObject<boolean>, step: React.MutableRefObject<boolean> }>) {

    const [texture, setTexture] = useState(world.current.GenTexture());
    texture.needsUpdate = true;

    useFrame(() => {
        if (play.current || step.current) {
            world.current.Step();
            step.current = false
        }

        if (world.current.changed) {
            texture.dispose();
            setTexture(world.current.GenTexture());
            texture.needsUpdate = true;
            world.current.changed = false;
        }
    });

    function handleClick(e: ThreeEvent<PointerEvent>) {
        const x = Math.floor(((e.point.x + 1) / 2) * world.current.size)
        const y = Math.floor(((e.point.y + 1) / 2) * world.current.size);
        world.current.ToggleCell(x, y);
    }

    return (
        <mesh onPointerDown={handleClick}>
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
}