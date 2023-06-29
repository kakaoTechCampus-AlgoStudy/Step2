const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const p = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);
let answer = 0;
p.reduce((prev, cur) => {
  const temp = prev + cur;
  answer += temp;
  return temp;
}, 0);
console.log(answer);
