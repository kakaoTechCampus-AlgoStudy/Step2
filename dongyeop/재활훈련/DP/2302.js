const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const m = Number(input[1]);
const dp = new Array(n + 1).fill(0);
let arr = [];
let prev = 0;
let answer = 1;
dp[0] = 1;
dp[1] = 1;
dp[2] = 2;
// 가능한 좌석 배치 경우의 수를 구하라.

function fibo(x) {
  if (dp[x] != 0) return dp[x];
  dp[x] = fibo(x - 1) + fibo(x - 2);
  return dp[x];
}
for (let i = 2; i < m + 2; i++) {
  vip = Number(input[i]);
  arr.push(vip - prev - 1);
  prev = vip;
}
arr.push(n - prev);
arr.forEach((value) => {
  answer *= fibo(value);
});
console.log(answer);
