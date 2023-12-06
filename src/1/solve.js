#!/usr/bin/env node

const fs = require('node:fs');
const readline = require('node:readline');

const digitMap = new Map([
    ['zero', '0'],
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9'],
]);

const populateDigits = (line, digits, source, processor) => {
    for (const input of source) {
        const firstIndex = line.indexOf(input);
        if (firstIndex !== -1) {
            digits[firstIndex] = processor(input);
        }
        const lastIndex = line.lastIndexOf(input);
        if (lastIndex !== -1) {
            digits[lastIndex] = processor(input);
        }
    }
}

const solveLineNumeric = (line) => {
    const digits = [];
    populateDigits(line, digits, digitMap.values(), (match) => match);
    const filtered = digits.filter(Boolean);
    return filtered[0] + filtered[filtered.length-1];
};

const solveLineAlphanumeric = (line) => {
    const digits = [];
    populateDigits(line, digits, digitMap.keys(), (match) => digitMap.get(match));
    populateDigits(line, digits, digitMap.values(), (match) => match);
    const filtered = digits.filter(Boolean);
    return filtered[0] + filtered[filtered.length-1];
}

const rlInterface = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity,
    console: false,
});

let solution1 = 0;
let solution2 = 0;
rlInterface.on('line', function(line) {
    solution1 += parseInt(solveLineNumeric(line));
    solution2 += parseInt(solveLineAlphanumeric(line));
});

rlInterface.on('close', function() {
    console.log('solution1', solution1);
    console.log('solution2', solution2);
});