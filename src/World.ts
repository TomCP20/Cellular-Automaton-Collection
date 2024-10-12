import { DataTexture } from "three";

export default class World {
    size: number;
    state: boolean[][];
    prevState: boolean[][];
    changed: boolean;
    birth: number[];
    survive: number[];
    constructor(size: number, birth: number[], survive: number[]) {
        this.size = size;
        this.state = this.GenWorld(() => false);
        this.prevState = [];
        this.changed = true;
        this.birth = birth;
        this.survive = survive;
    }

    Noise() {
        this.state = this.GenWorld(() => Math.random() >= 0.5);
        this.changed = true;
    }

    Clear() {
        this.state = this.GenWorld(() => false);
        this.changed = true;
    }

    GenWorld(f: () => boolean): boolean[][] {
        const world: boolean[][] = Array(this.size);
        for (let y = 0; y < this.size; y++) {
            world[y] = Array(this.size);
            for (let x = 0; x < this.size; x++) {
                world[y][x] = f();
            }
        }
        return world;
    }

    Step() {
        this.prevState = this.CopyState();
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const neighbors = this.CountNeighbors(x, y);
                if (this.prevState[y][x]) {
                    this.state[y][x] = this.survive.includes(neighbors);
                }
                else {
                    this.state[y][x] = this.birth.includes(neighbors);
                }
            }
        }
        this.changed = true;
    }

    CopyState(): boolean[][] {
        const copy: boolean[][] = Array(this.size)
        for (let y = 0; y < this.size; y++) {
            copy[y] = Array(this.size);
            for (let x = 0; x < this.size; x++) {
                copy[y][x] = this.state[y][x];
            }
        }
        return copy;
    }

    CountNeighbors(x: number, y: number): number {
        let neighbors = 0;
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dy === 0 && dx === 0) {
                    continue;
                }
                if (this.prevState[(y + dy + this.size) % this.size][(x + dx + this.size) % this.size]) {
                    neighbors++;
                }
            }
        }
        return neighbors;
    }


    SetCell(x: number, y: number, cell: boolean) {
        this.state[y][x] = cell;
        this.changed = true;
    }

    ToggleCell(x: number, y: number) {
        this.state[y][x] = !this.state[y][x];
        this.changed = true;
    }

    GenTexture() {
        const data = new Uint8Array(4 * this.size * this.size);
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const i = y * this.size + x;
                const stride = i * 4;
                if (this.state[y][x]) {
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