import "./style.css"
import { GameOfLife } from "./pages/GameOfLife";
import { HashRouter, Link, Route, Routes } from "react-router-dom";

export default function App() {

  return (
    <HashRouter>
      <nav className="bg-gray-600 text-center my-1">
        <ul className="overflow-hidden inline-block p-0 m-0 align-middle">
          <li className="float-left"><Link to={"/"} className="block text-white text-center p-[16px] text-dec hover:bg-slate-800">Home</Link></li>
          <li className="float-left"><Link to={"/2d"} className="block text-white text-center p-[16px] text-dec hover:bg-slate-800">Game Of Life</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" />
        <Route path="/2d" element={<GameOfLife />} />
      </Routes>
    </HashRouter>
  );
}