import { NavBarElement } from "./NavBarElement";

export function NavBar() {
  return <nav className="bg-gray-600 text-center my-1">
    <ul className="overflow-hidden inline-block p-0 m-0 align-middle">
      <NavBarElement to={"/"}>Home</NavBarElement>
      <NavBarElement to={"/1d"}>Wolfram Code</NavBarElement>
      <NavBarElement to={"/2d"}>Game Of Life</NavBarElement>
    </ul>
  </nav>;
}