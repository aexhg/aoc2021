
const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, './input.txt');

var data = fs.readFileSync(filename, 'utf-8').split('\n');

var input_numbers = data[0].split(',').map(x => Number(x));

var grids = [];
const grid_size_i = 5;

for (var i = 2; i < data.length; i += 6) {

    var sgrid = data.slice(i, i + 5)
        .map(x => x.split(' '))
        .flatMap(x => x)
        .filter(x => x !== '')
        .map(x => Number(x));
    var dgrid = {}
    sgrid.forEach((x, k) => dgrid[x] = k);
    grids.push(dgrid);

}


function checkGrid(data) {

    for (var i = 0; i < grid_size_i; ++i) {

        //horizontal values 
        var d = data.slice(i, i + grid_size_i);
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
        if (n in g) {
            var n_pos = g[n];
            grid_checks[j][n_pos] = 1;
        }
    }

    for (var j = 0; j < grids.length; ++j) {
        if(checkGrid(grid_checks[j])){
            const gc = grid_checks[j];
            const g = grids[j];
            var r_grid = {}
            Object.keys(g).forEach(k => r_grid[g[k]] = Number(k));
            var unmarked = gc.map((v, i) => {
                if(v === 0){
                    return r_grid[i];
                }
            }).filter(v => v !== undefined).reduce((a, v)=> a + v);

            var final_val = unmarked * n;
            console.log(n);
            console.log(j);
            console.log('\n');
            for(var i = 0; i < grid_size_i; ++i){
                console.log(g.slice(i, i + grid_size_i));
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