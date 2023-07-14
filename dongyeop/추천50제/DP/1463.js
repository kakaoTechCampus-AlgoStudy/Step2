const fs = require('fs');
const testing = true;

const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

let n = Number(input[0]);
let dp = new Array(n + 1).fill(Infinity);
dp[n] = 0;
for (let i = n; i > 0; i--) {
  if (i % 3 == 0) {
    dp[i / 3] = Math.min(dp[i / 3], dp[i] + 1);
  }
  if (i % 2 == 0) {
    dp[i / 2] = Math.min(dp[i / 2], dp[i] + 1);
  }
  dp[i - 1] = Math.min(dp[i - 1], dp[i] + 1);
}
console.log(dp[1]);
