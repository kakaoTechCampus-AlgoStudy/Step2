const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DP/18353/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [N] = input.shift();
const data = input.flat().reverse();
const dp = Array.from({ length: N + 1 }, () => 0);
let answer = Number.MIN_SAFE_INTEGER;

for (let i = 0; i < N; i++) {
  let max = 0;
  for (let j = i; j >= 0; j--) {
    if (data[j] < data[i] && dp[j] > max) max = dp[j];
  }
  dp[i] = max + 1;
  answer = Math.max(max + 1, answer);
}

console.log(N - answer);
