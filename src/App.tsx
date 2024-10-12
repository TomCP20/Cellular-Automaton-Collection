import "./style.css"
import { TwoDCellularAutomaton } from "./pages/TwoDCellularAutomaton";
import { HashRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { WolframCode } from "./pages/WolframCode";
import { ThreeDGameOfLife } from "./pages/ThreeDGameOfLife";
import Home from "./pages/Home";

export default function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/1d" element={<WolframCode />} />
        <Route path="/2d" element={<TwoDCellularAutomaton birth={[3]} survive={[2, 3]} />} />
        <Route path="/3d" element={<ThreeDGameOfLife />} />
      </Routes>
    </HashRouter>
  );
}