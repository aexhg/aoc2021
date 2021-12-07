const path = require('path');
const fs = require('fs');


async function calculate() {

    var data = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8').split('\n').map(x => Number(x));


    var count_increase = (data) => data.reduce((pv, cv, ci, arr) => {
        if (ci > 0) {
            return pv + ((cv - arr[ci - 1]) > 0 ? 1 : 0);
        }
        return 0;
    }, 0);

    var increasing = count_increase(data);
    console.log(increasing);

    var ws = 3;

    var sliding_window = data.map((x, i) => {
        if (i >= (ws - 1)) {

            return data.slice(i - ws + 1, i + 1).reduce((p, v) => p + v);
        }
        return 0;
    }).slice(ws - 1);
    // console.log(sliding_window);
    console.log(count_increase(sliding_window));
};

calculate();