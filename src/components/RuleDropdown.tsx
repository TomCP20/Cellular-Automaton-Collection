import { DropDown } from "./DropDown";

export function RuleDropdown({ rule, setRule }: Readonly<{ rule: number; setRule: React.Dispatch<React.SetStateAction<number>>; }>) {
    return (
        <DropDown val={rule} setVal={setRule} vals={Array.from(Array(256), (_e, i) => { return i })} label="Rule:" optionLabel={(s) => `${s}`} />
    );
}