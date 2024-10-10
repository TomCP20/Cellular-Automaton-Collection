import "./style.css"
import { GameOfLife } from "./pages/GameOfLife";
import { HashRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { WolframCode } from "./pages/WolframCode";
import { ThreeDGameOfLife } from "./pages/ThreeDGameOfLife";

export default function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" />
        <Route path="/1d" element={<WolframCode />} />
        <Route path="/2d" element={<GameOfLife />} />
        <Route path="/3d" element={<ThreeDGameOfLife />} />
      </Routes>
    </HashRouter>
  );
}