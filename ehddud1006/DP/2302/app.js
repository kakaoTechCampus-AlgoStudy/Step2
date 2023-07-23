const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DP/2302/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const start = 0;
const end = input.shift() + 1;
const vipSeatNumber = input.shift();
let kind = 1;
let prevVipSeat = start;

const dp = [];
dp[0] = dp[1] = 1;

for (let i = 2; i <= 40; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

for (let i = 0; i < vipSeatNumber; i++) {
  const vipSeat = input.shift();
  if (vipSeat > 0) {
    kind *= dp[vipSeat - prevVipSeat - 1];
  }

  prevVipSeat = vipSeat;
}

kind *= dp[end - prevVipSeat - 1];

console.log(kind);
