
const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, './input.txt');

var data = fs.readFileSync(filename, 'utf-8').split('\n');

const bin_size = data[0].length;


function count_vals(data, idx_pos){

    var eles_at = data.reduce((p, c) => p + c.charAt(idx_pos), '').split('').map(x => x === '1');
    var count_ones = eles_at.filter(x => x===true).length
    var count_zeroes = eles_at.length - count_ones;

    return [count_ones, count_zeroes]


}

function filter_diags_oxy(data, idx_pos) {

    if(data.length===1){
        return data[0];
    }
    const [count_ones, count_zeroes] = count_vals(data, idx_pos);
    
    if(count_ones === count_zeroes){
        var filtered = data.filter(x => x.charAt(idx_pos)==='1');
        return filter_diags_oxy(filtered, idx_pos+1);
    } else if (count_ones > count_zeroes){
        var filtered = data.filter(x => x.charAt(idx_pos)==='1');
        return filter_diags_oxy(filtered, idx_pos+1);
    } else {
        var filtered = data.filter(x => x.charAt(idx_pos)==='0');
        return filter_diags_oxy(filtered, idx_pos+1);
    }

}


function filter_diags_co2(data, idx_pos) {

    if(data.length===1){
        return data[0];
    }
    const [count_ones, count_zeroes] = count_vals(data, idx_pos);
    
    if(count_ones === count_zeroes){
        var filtered = data.filter(x => x.charAt(idx_pos)==='0');
        return filter_diags_co2(filtered, idx_pos+1);
    } else if (count_ones > count_zeroes){
        var filtered = data.filter(x => x.charAt(idx_pos)==='0');
        return filter_diags_co2(filtered, idx_pos+1);
    } else {
        var filtered = data.filter(x => x.charAt(idx_pos)==='1');
        return filter_diags_co2(filtered, idx_pos+1);
    }

}

console.time('run');

const final_val_oxy = filter_diags_oxy(data, 0);
console.log(final_val_oxy)

const oxy = parseInt(final_val_oxy, 2);
console.log(oxy);
const final_val_co2 = filter_diags_co2(data, 0);

console.log(final_val_co2);
const co2 = parseInt(final_val_co2, 2);
console.log(co2);

console.log(oxy * co2);
console.timeEnd('run');