import { ReactNode } from "react";
import { Link } from "react-router-dom";

export function NavBarElement({ children, to }: Readonly<{ children: ReactNode; to: string; }>) {
  return <li className="float-left"><Link to={to} className="block text-white text-center p-[16px] text-dec hover:bg-slate-800">{children}</Link></li>;
}
