export default abstract class World {
    size: number;
    state: boolean[];
    prevState: boolean[];
    changed: boolean;
    constructor(size: number, length: number) {
        this.size = size;
        this.state = Array(length);
        this.prevState = Array(length);
        this.changed = true;
    }

    abstract Step(): void;

    mod(n: number) {
        return (n + this.size) % this.size;
    }
}