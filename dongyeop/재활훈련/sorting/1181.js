const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const arr = [...new Set(input.slice(1))];
const sorted = arr.sort((a, b) => {
  if (a.length === b.length) {
    if (a < b) return -1;
    else if (a === b) return 0;
    else return 1;
  }
  return a.length - b.length;
});
let answer = [];
sorted.forEach((e) => {
  answer.push(e);
});
console.log(answer.join('\n'));
