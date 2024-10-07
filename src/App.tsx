import { GameOfLife } from "./GameOfLife";
import "./style.css"
import { Canvas } from "@react-three/fiber"

export default function App() {
  return (
    <div>
      <h1>Game of Life</h1>
      <Canvas orthographic camera={{ left: -1, right: 1, bottom: -1, top: 1 }} style={{ background: "black" }}>
        <GameOfLife width={200} height={200} />
      </Canvas>
    </div>
  );
}