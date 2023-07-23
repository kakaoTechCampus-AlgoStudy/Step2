const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DP/1904/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input.pop();
const dp = [];

dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= N; i++) {
  // for 문 안에서 15746를 나눈 값을 dp에 저장해야한다.
  // dp 의 값이 너무 커지면 overflow가 발생하기 때문이다.
  dp[i] = (dp[i - 1] + dp[i - 2]) % 15746;
}

console.log(dp[N]);
