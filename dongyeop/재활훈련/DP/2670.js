const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const dp = input.slice(1).map(Number);
for (let i = 1; i < n; i++) {
  dp[i] = Math.max(dp[i - 1] * dp[i], dp[i]);
}

console.log(Math.max(...dp).toFixed(3));
