const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DP/9461/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number)
  .reverse();

const N = input.pop();
const answer = [];

for (let i = 0; i < N; i++) {
  const M = input.pop();
  const dp = [null, 1, 1, 1, 2, 2, 3, 4, 5, 7];

  for (let j = 10; j <= M; j++) {
    dp[j] = dp[j - 5] + dp[j - 1];
  }

  answer.push(dp[M]);
}

console.log(answer.join("\n"));
