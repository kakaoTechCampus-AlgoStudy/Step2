const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DP/1436/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const [N] = input;
const dp = Array.from({ length: N + 1 }, () => 0);

for (let i = 2; i <= N; i++) {
  let firstCase = Number.MAX_SAFE_INTEGER;
  let secondCase = Number.MAX_SAFE_INTEGER;
  let thirdCase = Number.MAX_SAFE_INTEGER;

  if (i % 3 === 0) firstCase = dp[i / 3] + 1;
  if (i % 2 === 0) secondCase = dp[i / 2] + 1;
  thirdCase = dp[i - 1] + 1;

  dp[i] = Math.min(firstCase, secondCase, thirdCase);
}

console.log(dp[N]);
