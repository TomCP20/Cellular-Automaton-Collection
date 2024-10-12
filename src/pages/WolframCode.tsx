import { Canvas } from "@react-three/fiber";
import { WolframCodeMesh } from "../meshes/WolframCodeMesh";
import { SizeDropdown } from "../ui/SizeDropdown";
import { useState } from "react";
import { RuleDropdown } from "../ui/RuleDropdown";
import { Button } from "../ui/Button";

export function WolframCode() {
  const [rule, setRule] = useState(30);
  const [size, setSize] = useState(800);
  return (
    <div className="h-auto flex p-0">
      <div className="flex-1 self-center text-center" />
      <div className="size-[800px] text-center self-center">
        <Canvas orthographic camera={{ left: -1, right: 1, bottom: -1, top: 1 }} className="bg-black"  gl={{preserveDrawingBuffer: true}}>
          <WolframCodeMesh size={size} ruleNo={rule} />
        </Canvas>
      </div>
      <div className="flex-1 self-start text-left verti">
        <RuleDropdown rule={rule} setRule={setRule} /><br />
        <Button onClick={() => setRule(Math.floor(Math.random() * 256))}>Random</Button><br />
        <SizeDropdown size={size} setSize={setSize} />
      </div>
    </div>
  );
}