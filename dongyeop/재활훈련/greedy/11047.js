const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

let [n, k] = input[0].split(' ').map(Number);
const coins = input.slice(1).map(Number);
let answer = 0;
for (let i = coins.length - 1; i > -1; i--) {
  answer += Math.floor(k / coins[i]);
  k = k % coins[i];
  if (k === 0) {
    break;
  }
}
console.log(answer);
