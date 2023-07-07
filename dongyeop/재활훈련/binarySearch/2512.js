const fs = require('fs');
const testing = false;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const costs = input[1].split(' ').map(Number);
const m = Number(input[2]);

// 상한액을 구하고 총액 내에서 해결가능하도록 단 예산을 최대한 사용해야함.
let start = 1;
let end = costs.reduce((a, b) => Math.max(a, b));
let answer = 0;
while (start <= end) {
  let mid = parseInt((start + end) / 2);
  let total = 0;
  costs.forEach((cost) => {
    total += Math.min(cost, mid);
  });
  if (total <= m) {
    start = mid + 1;
    answer = mid;
  } else {
    end = mid - 1;
  }
}
console.log(answer);
