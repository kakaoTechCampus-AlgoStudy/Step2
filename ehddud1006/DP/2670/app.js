const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DP/2670/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input.shift();
const dp = [];
dp[0] = input[0];

for (let i = 1; i < N; i++) {
  dp[i] = Math.max(dp[i - 1] * input[i], input[i]);
}

const maxNumber = Math.max(...dp).toFixed(3);
console.log(maxNumber);
