import { DataTexture } from "three";

export default class World {
    width: number;
    height: number;
    state: boolean[][];
    prevState: boolean[][];
    changed: boolean;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.state = this.GenWorld(() => false);
        this.prevState = [];
        this.changed = true;
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
        const world: boolean[][] = [];
        for (let y = 0; y < this.height; y++) {
            world[y] = [];
            for (let x = 0; x < this.width; x++) {
                world[y][x] = f();
            }
        }
        return world;
    }

    Step() {
        this.prevState = this.CopyState();
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const neighbors = this.CountNeighbors(x, y);
                if (this.prevState[y][x]) {
                    this.state[y][x] = neighbors == 2 || neighbors == 3;
                }
                else {
                    this.state[y][x] = neighbors == 3;
                }
            }
        }
        this.changed = true;
    }

    CopyState(): boolean[][] {
        const copy: boolean[][] = []
        for (let y = 0; y < this.height; y++) {
            copy[y] = [];
            for (let x = 0; x < this.width; x++) {
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
                if (this.prevState[(y + dy + this.height) % this.height][(x + dx + this.width) % this.width]) {
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
        const data = new Uint8Array(4 * this.width * this.height);
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const i = y * this.width + x;
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
        return new DataTexture(data, this.width, this.height);
    }
}