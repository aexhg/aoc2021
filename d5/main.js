
const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, './input.txt');

var data = fs.readFileSync(filename, 'utf-8')
    .split('\n')
    .map(x => x.split('->')
        .map(x => x.split(',').map(Number)))

grid = {}

point_to_str = pt => pt.join(",")


update = pt => {
    pts = point_to_str(pt);
    if (!(pts in grid)) {
        grid[pts] = 1;
    } else {
        grid[pts] += 1;
    }

}
console.time('run');
for (const pts of data) {

    var [p1, p2] = pts;
    var [p1x, p1y] = p1;
    var [p2x, p2y] = p2;

    if (p1x === p2x) {

        if(p1y > p2y){
            [p1y, p2y] = [p2y, p1y];
        }

        for (var y = p1y; y <= p2y; ++y) {

            update([p1x,y]);

        }


    } else if (p1y === p2y) {

        if(p1x > p2x){
            [p1x, p2x] = [p2x, p1x];
        }
        for (var x = p1x; x <= p2x; ++x) {
            update([x, p1y]);

        }

    } else {

        //diagonal

        if(p1x > p2x){

            [p1, p2] = [p2, p1];
            [p1x, p1y] = p1;
            [p2x, p2y] = p2;
        }

        if(p1y > p2y) {

            for(var [x, y] = [p1x, p1y]; x <= p2x; ++x, --y){

                update([x,y]);

            }

        } else {

            for(var [x,y] = [p1x, p1y]; x <=p2x; ++x, ++y){
                update([x,y]);
            }
        }

    }

}

const val = Object.entries(grid).filter(x => x[1]>=2)
console.timeEnd('run');
console.log(val.length)
//console.log(grid)

