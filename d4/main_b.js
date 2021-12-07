
const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, './input.txt');

var data = fs.readFileSync(filename, 'utf-8').split('\n\n');

var input_numbers = data.shift().split(',').map(Number)

var grids = data
    .map(x=>x.split('\n').map(x => x.trimStart().split(/\s+/).map(Number)))
    .map(x=>x.flat())
const grid_size_i = 5;


function checkGrid(data) {

    for (var i = 0; i < grid_size_i; ++i) {

        //horizontal values 
        var d = data.slice(i * grid_size_i, i * grid_size_i + grid_size_i);
        if (d.every(x => x === 1)) {
            return true;
        }
        //vertical values
        var values = d.map((x, j) => i + j * grid_size_i);
        var f = values.map(x => data[x]);
        if (f.every(x => x === 1)) {
            return true;
        }

    }

    return false;

}

var grid_checks = new Array(grids.length).fill(0).map(() => new Array(grid_size_i * grid_size_i).fill(0));
console.time('run');

for (var i = 0; i < input_numbers.length; ++i) {
    const n = input_numbers[i];


    for (var j = 0; j < grids.length; ++j) {
        let g = grids[j];
        if (g.includes(n)) {
            var n_pos = g.findIndex(x => x == n);
            grid_checks[j][n_pos] = 1;
        }
    }

    for (var j = 0; j < grids.length; ++j) {
        if (checkGrid(grid_checks[j])) {
            const gc = grid_checks[j];
            const g = grids[j];
            var unmarked = gc.map((v, k) => {
                if (v === 0) {
                    return g[k];
                }
            }).filter(v => v !== undefined).reduce((a, v) => a + v);

            var final_val = unmarked * n;
            var final_val = unmarked * n;
            console.log(n);
            console.log(j);
            console.log('\n');
            for(var i = 0; i < grid_size_i; ++i){
                console.log(g.slice(i*grid_size_i, i *grid_size_i +  grid_size_i));
            }
            console.log('\n');
            for(var i = 0; i < grid_size_i; ++i){
                console.log(gc.slice(i, i + grid_size_i));
            }
            console.log(final_val);

            console.timeEnd('run');
            return 0;

        }
    }

}