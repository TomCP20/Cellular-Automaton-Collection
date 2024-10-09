export function RuleDropdown({ rule, setRule }: Readonly<{ rule: number; setRule: React.Dispatch<React.SetStateAction<number>>; }>) {
    return (
        <label className="m-1">
            Rule:{" "}<br />
            <select value={rule} onChange={e => setRule(+e.target.value)} className="m-1 w-20">
            {Array.from(Array(255), (_e, i) => { return <option key={i}>{i}</option> })}
            </select>
        </label>
    );
}