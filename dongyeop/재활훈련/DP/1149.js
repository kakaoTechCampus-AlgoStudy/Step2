const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);

const houses = input.slice(1).map((e) => e.split(' ').map(Number));
const dp = new Array(n).fill(0).map((e) => new Array(3).fill(0));
dp[0] = houses[0];
for (let i = 1; i < n; i++) {
  for (let color = 0; color < 3; color++) {
    if (color === 0) {
      dp[i][0] = Math.min(dp[i - 1][1] + houses[i][0], dp[i - 1][2] + houses[i][0]);
    } else if (color === 1) {
      dp[i][1] = Math.min(dp[i - 1][0] + houses[i][1], dp[i - 1][2] + houses[i][1]);
    } else {
      dp[i][2] = Math.min(dp[i - 1][0] + houses[i][2], dp[i - 1][1] + houses[i][2]);
    }
  }
}
console.log(Math.min(...dp[n - 1]));
