import World from "./World";

export default class ThreeDWorld extends World {
  constructor(size: number) {
    super(size, size * size * size)
    this.GenWorld();
  }

  GenWorld() {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        for (let z = 0; z < this.size; z++) {
          this.state[this.GetIndex(x, y, z)] = Math.random() >= 0.75;
        }
      }
    }
    this.changed = true;
  }

  GetIndex(x: number, y: number, z: number) {
    return x * this.size * this.size + y * this.size + z;
  }

  GetCoords(i: number): [number, number, number] {
    const x = Math.floor(i / (this.size * this.size));
    const y = Math.floor((i % (this.size * this.size)) / this.size);
    const z = i % (this.size);
    return [x, y, z];
  }

  countNeighbors(i: number) {
    const [x, y, z] = this.GetCoords(i);
    let neighbors = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (dx === 0 && dy === 0 && dz === 0) {
            continue;
          }
          const i = this.GetIndex(this.mod(x + dx), this.mod(y + dy), this.mod(z + dz))
          if (this.prevState[i]) {
            neighbors++;
          }
        }
      }
    }
    return neighbors;
  }

  Step() {
    this.prevState = this.state.splice(0);
    for (let i = 0; i < this.size * this.size * this.size; i++) {
      const neighbors: number = this.countNeighbors(i);
      if (this.prevState[i]) {
        this.state[i] = (5 <= neighbors && neighbors <= 7);
      }
      else {
        this.state[i] = (6 <= neighbors && neighbors <= 6);
      }

    }
    this.changed = true;
  }
}
