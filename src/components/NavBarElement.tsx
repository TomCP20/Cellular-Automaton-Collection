import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export function NavBarElement({ children, to }: Readonly<{ children: ReactNode; to: string; }>) {
  const activeLink = "block p-[16px] bg-slate-800";
  const normalLink = "block p-[16px]";
  return (
    <li className="float-left text-white text-center hover:bg-slate-800">
      <NavLink to={to} className={({ isActive }) => (isActive ? activeLink : normalLink)}>
        {children}
      </NavLink>
    </li>
  );
}
