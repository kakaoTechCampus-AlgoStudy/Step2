const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DP/2156/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number)
  .reverse();

const N = input.pop();
const data = [];
const dp = [];

for (let i = 1; i <= N; i++) {
  data[i] = input.pop();
}

dp[1] = data[1];
dp[2] = data[1] + data[2];
dp[3] = Math.max(data[1] + data[3], data[2] + data[3], data[1] + data[2]); // 초기값도 점화식을 따라줘야한다.

for (let i = 4; i <= N; i++) {
  dp[i] = Math.max(
    dp[i - 2] + data[i],
    data[i] + data[i - 1] + dp[i - 3],
    dp[i - 1]
  );
}

console.log(dp[N]);
