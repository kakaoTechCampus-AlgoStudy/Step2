const fs = require('fs');
const testing = true;
const input = fs.readFileSync(testing ? './test.txt' : './dev/stdin').toString();

const n = Number(input);
const dp = new Array(n + 1).fill(Infinity);
dp[1] = 0;
dp[2] = 1;
dp[3] = 1;
for (let i = 4; i < n + 1; i++) {
  if (i % 3 === 0) {
    dp[i] = Math.min(dp[Math.floor(i / 3)] + 1, dp[i]);
  }
  if (i % 2 === 0) {
    dp[i] = Math.min(dp[Math.floor(i / 2)] + 1, dp[i]);
  }
  dp[i] = Math.min(dp[i - 1] + 1, dp[i]);
}

console.log(dp[n]);
