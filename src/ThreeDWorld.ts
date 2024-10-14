export default class ThreeDWorld {
  size: number;
  state: boolean[];
  prevState: boolean[];
  changed: boolean;
  constructor(size: number) {
    this.size = size;
    this.state = Array(this.size * this.size * this.size);
    this.prevState = Array(this.size * this.size * this.size);
    this.changed = true;
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
    return x*this.size*this.size + y*this.size + z;
  }

  countNeighbors(x: number, y: number, z: number) {
    let neighbors = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (dx === 0 && dy === 0 && dz === 0) {
            continue;
          }
          const i = this.GetIndex((x + dx + this.size) % this.size, (y + dy + this.size) % this.size, (z + dz + this.size) % this.size)
          if (this.prevState[i]) {
            neighbors++;
          }
        }
      }
    }
    return neighbors;
  }

  stepWorld() {
    this.prevState = this.state.splice(0);
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        for (let z = 0; z < this.size; z++) {
          const i = this.GetIndex(x, y, z)
          const neighbors: number = this.countNeighbors(x, y, z);
          if (this.prevState[i]) {
            this.state[i] = (5 <= neighbors && neighbors <= 7);
          }
          else {
            this.state[i] = (6 <= neighbors && neighbors <= 6);
          }
        }
      }
    }
    this.changed = true;
  }
}
