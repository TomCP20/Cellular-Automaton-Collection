import { Canvas } from "@react-three/fiber";
import { WolframCodeMesh } from "../meshes/WolframCodeMesh";
import { SizeDropdown } from "../components/SizeDropdown";
import { useState } from "react";
import { RuleDropdown } from "../components/RuleDropdown";

export function WolframCode() {
    const [rule, setRule] = useState(30);
    const [size, setSize] = useState(800);
    return (
      <div className="h-auto flex p-0">
        <div className="flex-1 self-center text-center" />
        <div className="size-[800px] text-center self-center">
          <Canvas orthographic camera={{ left: -1, right: 1, bottom: -1, top: 1 }}>
            <WolframCodeMesh size={size} ruleNo={rule}/>
          </Canvas>
        </div>
        <div className="flex-1 self-start text-left verti">
          <RuleDropdown rule={rule} setRule={setRule}/><br/>
          <SizeDropdown size={size} setSize={setSize}/>
        </div>
      </div>
    );
  }