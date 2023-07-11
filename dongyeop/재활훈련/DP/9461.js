const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const t = Number(input[0]);
for (let i = 1; i <= t; i++) {
  const n = Number(input[i]);
  let dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 1;
  dp[3] = 1;
  dp[4] = 2;
  dp[5] = 2;
  for (let i = 6; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 5];
  }
  console.log(dp[n]);
}
