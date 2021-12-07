
const fs = require('fs');
const path = require('path');
const filename = './test.txt';

class Position {
    constructor() {
        this.x = 0; // horizontal
        this.y = 0; // vertical 
        this.z = 0; // aim 
    }
}

function update(direction, value) {
    switch (direction) {
        case "forward":
            return (position) => {
                position.x += value;
                position.y += (position.z * value);
            }
        case "down":
            return (position) => position.z += value;
        case "up":
            return (position) => position.z -= value;
    }
}

let position = new Position();


const data = fs.readFileSync(path.join(
    __dirname,
    filename), 'utf-8'
).split('\n').map(l => {
    vals = l.split(' ');
    direction = vals[0];
    value = Number(vals[1]);
    return update(direction, value)(position);
});


console.log(Math.abs(position.x) * Math.abs(position.y));

