const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const t = Number(input[0]);
for (let i = 1; i <= t; i++) {
  const n = Number(input[i]);
  const dp = new Array(n + 1).fill(0).map((e) => [0, 0]);
  dp[0] = [1, 0];
  dp[1] = [0, 1];

  for (let i = 2; i <= n; i++) {
    dp[i][0] = dp[i - 1][0] + dp[i - 2][0];
    dp[i][1] = dp[i - 1][1] + dp[i - 2][1];
  }
  console.log(dp[n][0], dp[n][1]);
}
