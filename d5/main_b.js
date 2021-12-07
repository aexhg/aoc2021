
const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, './input.txt');

var data = fs.readFileSync(filename, 'utf-8')
    .split('\n')
    .map(x => x.split('->')
        .map(x => x.split(',').map(Number)))

grid = new Map();

point_to_str = (...pt) => pt.join(",")
console.time('run');

for (const pt of data) {

    const [p1, p2] = pt;
    const [p1x, p1y] = p1;
    const [p2x, p2y] = p2;

    const c1 = Math.sign(p2x - p1x);
    const c2 = Math.sign(p2y - p1y);

    for (var x = p1x, y = p1y; x != p2x + c1 || y != p2y + c2; x += c1, y += c2) {
        const key = point_to_str(x, y);
        const value = (grid.get(key) ?? 0) + 1;
        grid.set(key, value);
    }

}

const val = Array.from(grid.values()).filter(x => x >= 2)
console.timeEnd('run');
console.log(val.length)
//console.log(grid)

