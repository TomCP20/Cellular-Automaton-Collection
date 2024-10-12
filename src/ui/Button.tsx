import { ReactNode } from "react";

export function Button({ children, onClick, disabled }: Readonly<{ children: ReactNode; onClick?: () => void; disabled?: boolean }>) {

  return (
    <button onClick={onClick} disabled={disabled} className="text-center m-0.5 p-1 w-20 rounded-sm border border-solid border-black bg-gray-200 hover:bg-gray-300 disabled:bg-gray-400">{children}</button>
  );
}