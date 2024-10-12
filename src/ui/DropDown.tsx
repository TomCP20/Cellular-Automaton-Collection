export function DropDown({ val, setVal, vals, label, optionLabel }: Readonly<{ val: number; setVal: React.Dispatch<React.SetStateAction<number>>; vals: number[]; label: string; optionLabel: (s: number) => string; }>) {
    return (
        <label className="m-1 select-none">
            {label}<br />
            <select value={val} onChange={e => setVal(+e.target.value)} className="m-1 min-w-20">
                {vals.map((s) => <option key={s} value={s}>{optionLabel(s)}</option>)}
            </select>
        </label>
    );
}
