import World from "../World";
import { MutableRefObject, useState } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";

export function TwoDCellularAutomatonMesh({ world}: Readonly<{ world: MutableRefObject<World> }>) {

    const [texture, setTexture] = useState(world.current.GenTexture());
    texture.needsUpdate = true;

    useFrame(() => {
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
            <meshBasicMaterial toneMapped={false} map={texture} />
        </mesh>
    );
}