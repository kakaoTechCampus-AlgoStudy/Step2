const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');
const n = input[0];
const arr = input.slice(1).map(Number);
let answer = '';
arr.sort((a, b) => a - b).forEach((e) => (answer += e + '\n'));
console.log(answer);
