import { ReactNode } from "react";

export function Button({ children, onClick }: Readonly<{ children: ReactNode; onClick?: () => void; }>) {

  return (
    <button onClick={onClick} className="text-center m-0.5 p-1 w-20 rounded-sm border border-solid border-black bg-gray-200 hover:bg-gray-300">{children}</button>
  );
}