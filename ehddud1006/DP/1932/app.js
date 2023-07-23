const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DP/1932/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [N] = input.shift();
const dp = Array.from({ length: N }, () => Array(N).fill(0));

dp[0][0] = input[0][0];

for (let i = 1; i < N; i++) {
  // i 1 j 0
  for (let j = 0; j < input[i].length; j++) {
    dp[i][j] = Math.max(
      input[i][j] + (dp[i - 1][j - 1] ?? 0),
      input[i][j] + (dp[i - 1][j] ?? 0)
    );
  }
}

console.log(Math.max(...dp[N - 1]));
