const fs = require('fs');
const testing = true;
const input = fs.readFileSync(testing ? './test.txt' : './dev/stdin').toString();

const n = Number(input);
let dp = [0, 1, 2];
for (let i = 3; i <= n; i++) {
  dp[i] = (dp[i - 2] + dp[i - 1]) % 15746;
}
console.log(dp[n]);
