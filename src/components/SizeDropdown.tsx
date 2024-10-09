export function SizeDropdown({ size, setSize }: Readonly<{ size: number; setSize: React.Dispatch<React.SetStateAction<number>>; }>) {
    const sizes = [10, 20, 50, 100, 200, 400, 800];
    return (
        <label className="m-1">
            Size:{" "}<br />
            <select value={size} onChange={e => setSize(+e.target.value)} className="m-1 w-20">
                {sizes.map((s) => <option key={s} value={s}>{s}x{s}</option>)}
            </select>
        </label>
    );
}
