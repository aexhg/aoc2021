
import exp from 'constants';
import { readFileSync } from 'fs';
const filename = new URL('test.txt', import.meta.url);

class Position {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}

/**
 * 
 * @param {string} direction 
 * @param {int} value 
 * @returns 
 */
function update(direction, value) {
    switch (direction) {
        case "forward":
            return (position) => position.x += value;
        case "down":
            return (position) => position.y -= value;
        case "up":
            return (position) => position.y += value;
    }
}


const data = readFileSync(
    filename, 'utf-8'
).split('\n').map(l => {
    var vals = l.split(' ');
    var direction = vals[0];
    var value = Number(vals[1]);
    return update(direction, value);
});

let position = new Position();

data.forEach(

    u => {
        u(position);
    }
);
console.log(position);
console.log(Math.abs(position.x) * Math.abs(position.y));

