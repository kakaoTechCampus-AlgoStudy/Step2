const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const soldiers = input[1].split(' ').map(Number);

const dp = new Array(n).fill(1);
for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (soldiers[j] > soldiers[i]) {
      dp[i] = Math.max(dp[j] + 1, dp[i]);
    }
  }
}
console.log(n - Math.max(...dp));
