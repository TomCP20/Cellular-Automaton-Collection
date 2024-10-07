import Material from "./Material"
import "./style.css"
import { Canvas } from "@react-three/fiber"

export default function App() {
  return (
    <div>
      <Canvas orthographic camera={{ left: -1, right: 1, bottom: -1, top: 1 }} style={{ background: "black" }}>
        <mesh>
          <planeGeometry args={[2, 2]} />
          <Material />
        </mesh>
      </Canvas>
    </div>
  )
}

