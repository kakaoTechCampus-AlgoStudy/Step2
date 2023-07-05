const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DP/10844/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input.pop();
const dp = Array.from({ length: N + 1 }, () => Array(10).fill(0));

for (let i = 1; i < 10; i++) {
  dp[1][i] = 1;
}

for (let i = 2; i <= N; i++) {
  for (let j = 0; j < 10; j++) {
    if (j === 0) dp[i][j] += dp[i - 1][j + 1] % 1_000_000_000;
    else if (j === 9) dp[i][j] += dp[i - 1][j - 1] % 1_000_000_000;
    else dp[i][j] += (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % 1_000_000_000;
  }
}

let sum = 0;
for (let i = 0; i < 10; i++) {
  sum += dp[N][i];
}
console.log(sum % 1_000_000_000);
