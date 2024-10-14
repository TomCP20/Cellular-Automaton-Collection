import { DataTexture } from "three";

export default class TwoDWorld {
    size: number;
    state: boolean[];
    prevState: boolean[];
    changed: boolean;
    birth: number[];
    survive: number[];
    constructor(size: number, birth: number[], survive: number[]) {
        this.size = size;
        this.state = Array(this.size * this.size);
        this.prevState = Array(this.size * this.size);
        this.changed = true;
        this.birth = birth;
        this.survive = survive;
    }

    getIndex(x: number, y: number) {
        return y * this.size + x;
    }

    Noise() {
        for (let i = 0; i < this.size * this.size; i++) {
            this.state[i] = Math.random() >= 0.5;
        }
        this.changed = true;
    }

    Clear() {
        this.state = Array(this.size * this.size);
        this.changed = true;
    }

    Step() {
        this.prevState = this.state.splice(0);
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const i = this.getIndex(x, y);
                const neighbors = this.CountNeighbors(x, y);
                if (this.prevState[i]) {
                    this.state[i] = this.survive.includes(neighbors);
                }
                else {
                    this.state[i] = this.birth.includes(neighbors);
                }
            }
        }
        this.changed = true;
    }

    CountNeighbors(x: number, y: number): number {
        let neighbors = 0;
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dy === 0 && dx === 0) {
                    continue;
                }
                const i = this.getIndex(this.mod(x + dx), this.mod(y + dy));
                if (this.prevState[i]) {
                    neighbors++;
                }
            }
        }
        return neighbors;
    }

    mod(n: number) {
        return (n + this.size) % this.size;
    }


    SetCell(x: number, y: number, cell: boolean) {
        this.state[this.getIndex(x, y)] = cell;
        this.changed = true;
    }

    ToggleCell(x: number, y: number) {
        this.state[this.getIndex(x, y)] = !this.state[this.getIndex(x, y)];
        this.changed = true;
    }

    GenTexture() {
        const data = new Uint8Array(4 * this.size * this.size);
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const i = this.getIndex(x, y);
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
        }
        return new DataTexture(data, this.size, this.size);
    }
}