export default class World {
    width: number;
    height: number;
    state: boolean[];
    prevState: boolean[];
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.state = this.GenState()
        this.prevState = [];
    }

    GenState(): boolean[] {
        const size = this.width * this.height;
        const world = [];
        for (let i = 0; i < size; i++) {
            world[i] = Math.random() >= 0.5
        }
        return world;
    }

    Step() {
        this.prevState = this.state.slice()
        for (let i = 0; i < this.state.length; i++) {
            const neighbors = this.CountNeighbors(i);
            if (this.prevState[i]) {
                this.state[i] = neighbors == 2 || neighbors == 3
            }
            else {
                this.state[i] = neighbors == 3
            }
        }
    }

    CountNeighbors(i: number): number {
        const x = i % this.width;
        const y = Math.floor(i / this.width);
        let neighbors = 0
        const deltas: [number, number][] = [[-1, 1], [0, 1], [1, 1], [-1, 0], [1, 0], [-1, -1], [0, -1], [1, -1]];
        deltas.forEach(([dx, dy]) => { if (this.CheckCell(x + dx, y + dy)) { neighbors++; } });
        return neighbors;
    }

    CheckCell(x: number, y: number): boolean {
        return this.prevState[(y % this.height) * this.width + (x % this.width)]
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