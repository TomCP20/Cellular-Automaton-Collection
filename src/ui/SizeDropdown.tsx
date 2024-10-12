import DropDown from "./DropDown";

export default function SizeDropdown({ size, setSize }: Readonly<{ size: number; setSize: React.Dispatch<React.SetStateAction<number>>; }>) {
    const sizes = [10, 20, 50, 100, 200, 400, 800];
    return (
        <DropDown val={size} setVal={setSize} vals={sizes} label="Size:" optionLabel={(s) => `${s}x${s}`}/>
    );
}