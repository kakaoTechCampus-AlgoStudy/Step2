const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const sorted = input
  .slice(1)
  .map((e) => e.split(' ').map(Number))
  .sort((a, b) => (a[1] - b[1] === 0 ? a[0] - b[0] : a[1] - b[1]));

let answer = 0;
sorted.reduce(
  (prev, cur) => {
    if (prev[1] <= cur[0]) {
      answer += 1;
      return cur;
    }
    return prev;
  },
  [0, 0]
);
console.log(answer);
