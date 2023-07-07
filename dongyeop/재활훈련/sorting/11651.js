const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const arr = input.slice(1).map((e) => e.split(' ').map(Number));
const sorted = arr.sort((a, b) => (a[1] - b[1] === 0 ? a[0] - b[0] : a[1] - b[1]));
let answer = '';
sorted.forEach((e) => {
  answer += e[0] + ' ' + e[1] + '\n';
});
console.log(answer);
