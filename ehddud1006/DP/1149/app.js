const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DP/1149/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [N] = input.shift();
const dp = Array.from({ length: N }, () =>
  Array(3).fill(Number.MAX_SAFE_INTEGER)
);

for (let i = 0; i < 3; i++) {
  dp[0][i] = input[0][i];
}

for (let i = 1; i < N; i++) {
  for (let j = 0; j < 3; j++) {
    for (let k = 0; k < 3; k++) {
      if (k !== j) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 1][k] + input[i][j]);
      }
    }
  }
}

console.log(Math.min(...dp[N - 1]));
