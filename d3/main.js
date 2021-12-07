
const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, './input.txt');

var data = fs.readFileSync(filename, 'utf-8').split('\n');

const bin_size = data[0].length;

var data_t = [];
for(var i = 0; i < bin_size; ++i){
    data_t.push(data.reduce((p, c) => p + c.charAt(i), ''));
}

var gamma = data_t.reduce((p, c) => {
    var number_ones = c.split('').map((x, i) => {
        if(x === '1'){
            return i+1;
        }
    }).filter(Boolean).length;
    var number_zeroes = c.split('').map((x, i) => {
        if(x === '0'){
            return i+1;
        }
    }).filter(Boolean).length;
    return p + (number_ones > number_zeroes ? '1' : '0');
}, '')

var epsilon = data_t.reduce((p, c) => {
    var number_ones = c.split('').map((x, i) => {
        if(x === '1'){
            return i+1;
        }
    }).filter(Boolean).length;
    var number_zeroes = c.split('').map((x, i) => {
        if(x === '0'){
            return i+1;
        }
    }).filter(Boolean).length;
    return p + (number_ones > number_zeroes ? '0' : '1');
}, '')
//console.log(data_t);
console.log(gamma);
console.log(epsilon);

gamma = parseInt(gamma, 2);
epsilon = parseInt(epsilon, 2);
console.log(gamma);
console.log(epsilon);

console.log(epsilon * gamma);
