const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, './input.txt');

const data = fs.readFileSync(filename, 'utf-8').split(',').map(Number);
const min_point = Math.min(...data);
const max_point = Math.max(...data);
const cost_per_move = 1;


cost_f = (position, target) => {
    const moves = Math.abs(position - target);
    if (moves > 0) {
        const fuel_cost = moves * (moves + 1) / 2;  //Array.from({ length: moves }).map((x, i) => i + 1).reduce((a, v) => a + v);
        return fuel_cost;// * cost_per_move;
    }
    return 0;
}

const range = Array.from({ length: max_point - min_point + 1 }).map((x, i) => i + min_point);


const cost = range.map(target => {
    return data.map(pos => cost_f(target, pos)).reduce((a, v) => a + v);
});

console.log(cost);
console.log(Math.min(...cost));
