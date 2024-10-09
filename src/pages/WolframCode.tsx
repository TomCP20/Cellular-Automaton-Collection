import { Canvas } from "@react-three/fiber";
import { WolframCodeMesh } from "../meshes/WolframCodeMesh";

export function WolframCode() {
    return (
      <div className="h-auto flex p-0">
        <div className="flex-1 self-center text-center" />
        <div className="size-[800px] text-center self-center">
          <Canvas orthographic camera={{ left: -1, right: 1, bottom: -1, top: 1 }}>
            <WolframCodeMesh />
          </Canvas>
        </div>
        <div className="flex-1 self-start text-left verti" />
      </div>
    );
  }