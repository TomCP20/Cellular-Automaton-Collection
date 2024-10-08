export function SizeDropdown({ size, setSize }: Readonly<{ size: number; setSize: React.Dispatch<React.SetStateAction<number>>; }>) {
    const sizes = [10, 20, 50, 100, 200, 400, 800];
    return (
        <label>
            Size:{" "}
            <select value={size} onChange={e => setSize(+e.target.value)}>
                {sizes.map((s) => <option key={s} value={s}>{s}x{s}</option>)}
            </select>
        </label>
    );
}
