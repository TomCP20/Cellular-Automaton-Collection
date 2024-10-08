export default class World {
    width: number;
    height: number;
    state: boolean[];
    prevState: boolean[];
    changed: boolean;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.state = this.GenWorld(() => Math.random() >= 0.5);
        this.prevState = [];
        this.changed = true;
    }

    Reset()
    {
        this.state = this.GenWorld(() => Math.random() >= 0.5);
        this.changed = true;
    }

    Clear()
    {
        this.state = this.GenWorld(() => false);
        this.changed = true;
    }

    GenWorld(f: () => boolean): boolean[] {
        const size = this.width * this.height;
        const world = [];
        for (let i = 0; i < size; i++) {
            world[i] = f();
        }
        return world;
    }

    Step() {
        this.prevState = this.state.slice()
        for (let i = 0; i < this.state.length; i++) {
            const neighbors = this.CountNeighbors(i);
            if (this.prevState[i]) {
                this.state[i] = neighbors == 2 || neighbors == 3;
            }
            else {
                this.state[i] = neighbors == 3;
            }
        }
        this.changed = true;
    }

    CountNeighbors(i: number): number {
        const x = i % this.width;
        const y = Math.floor(i / this.width);
        let neighbors = 0;
        const deltas: [number, number][] = [[-1, 1], [0, 1], [1, 1], [-1, 0], [1, 0], [-1, -1], [0, -1], [1, -1]];
        deltas.forEach(([dx, dy]) => { if (this.GetCell(x + dx, y + dy)) { neighbors++; } });
        return neighbors;
    }

    GetCell(x: number, y: number): boolean {
        return this.prevState[this.getIndex(x, y)];
    }

    SetCell(x: number, y: number, cell: boolean) {
        this.state[this.getIndex(x, y)] = cell;
        this.changed = true;
    }

    ToggleCell(x: number, y: number) {
        const i = this.getIndex(x, y);
        this.state[i] = !this.state[i];
        this.changed = true;
    }

    getIndex(x: number, y: number): number {
        return (y % this.height) * this.width + (x % this.width);
    }

    GenData() {
        const data = new Uint8Array(4 * this.state.length);
        for (let i = 0; i < this.state.length; i++) {
            const stride = i * 4;
            if (this.state[i]) {
                data[stride] = 255;
                data[stride + 1] = 255;
                data[stride + 2] = 255;
                data[stride + 3] = 255;
            }
            else {
                data[stride] = 0;
                data[stride + 1] = 0;
                data[stride + 2] = 0;
                data[stride + 3] = 255;
            }
        }
        return data;
    }
}