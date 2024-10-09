import { DataTexture } from "three";

export function WolframCodeMesh() {
    const size = 800;
    const ruleNo = 30;
    const rule: boolean[] = [];
    let n = ruleNo;
    for (let i = 0; i < 8; i++) {
        rule[i] = n%2 === 1;
        n = Math.floor(n/2);
    }
    console.log(rule);
    const grid: boolean[][] = [[]];
    for (let x = 0; x < size; x++) {
        grid[0][x] = x === Math.floor(size/2);
        
    }
    for (let y = 1; y < size; y++) {
        grid[y] = [];
        for (let x = 0; x < size; x++) {
            const left = grid[y-1][(x-1+size)%size];
            const me = grid[y-1][x];
            const right = grid[y-1][(x+1)%size];
            const index = 4*+left+2*+me+1*+right;
            grid[y][x] = rule[index];
        }
    }

    const data = new Uint8Array(4 * size * size);
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const i = y * size + x;
            const stride = i * 4;
            if (!grid[y][x]) {
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
    const texture= new DataTexture(data, size, size);
    texture.needsUpdate = true;
    texture.flipY =true;
    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial toneMapped={false} map={texture} />
        </mesh>
    );
}