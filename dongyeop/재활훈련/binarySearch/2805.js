const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

let [n, m] = input[0].split(' ').map(Number);
const trees = input[1].split(' ').map(Number);

let answer = 0;
let start = 0;
let end = trees.reduce((a, b) => Math.max(a, b));

while (start <= end) {
  let mid = parseInt((start + end) / 2);
  let total = 0;
  trees.forEach((tree) => {
    if (tree - mid > 0) total += tree - mid;
  });
  if (total < m) {
    end = mid - 1;
  } else if (total === m) {
    answer = mid;
    break;
  } else {
    start = mid + 1;
    answer = mid;
  }
}
console.log(answer);
