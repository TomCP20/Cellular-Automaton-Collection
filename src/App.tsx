import "./style.css"
import { GameOfLife } from "./pages/GameOfLife";
import { HashRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";

export default function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" />
        <Route path="/2d" element={<GameOfLife />} />
      </Routes>
    </HashRouter>
  );
}