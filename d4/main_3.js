
const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, './test.txt');

const data = fs.readFileSync(filename, 'utf-8').split('\n\n');
const input_numbers = data.shift().split(',').map(Number)

const grids = data
    .map(x => x.split('\n').map(x => x.trimStart().split(/\s+/).map(Number)))
    .map(x => x.flat())
const grid_size_i = 5;

const idx = grids.map(g => {
    
    return input_numbers.findIndex((_, j) => {
        for (var i = 0; i < grid_size_i; ++i) {

            //horizontal values 
            var d = g.slice(i * grid_size_i, i * grid_size_i + grid_size_i);
            if (d.every(x => input_numbers.slice(0, j).some(v => v === x))) {
                return true;
            }
            //vertical values
            var values = d.map((x, j) => i + j * grid_size_i);
            var f = values.map(x => data[x]);
            if (f.every(x => input_numbers.slice(0, j).some(v => v === x))) {
                return true;
            }

        }

        return false;

    });
})

console.log(idx)
