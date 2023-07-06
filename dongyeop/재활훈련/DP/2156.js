const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const wines = [0, ...input.slice(1).map(Number)];
const dp = new Array(n + 1).fill(0);
dp[1] = wines[1];
if (n > 1) {
  dp[2] = wines[1] + wines[2];
  for (let i = 3; i < n + 1; i++) {
    // 안마시고 마시고 마시고
    // 마시고 안마시고 마시고
    // 마시고 마시고 안마시고
    dp[i] = Math.max(dp[i - 3] + wines[i - 1] + wines[i], dp[i - 2] + wines[i], dp[i - 1]);
  }
}

console.log(dp[n]);
