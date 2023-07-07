const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const board = input.slice(1).map((e) => e.split(' ').map(Number));
const dp = new Array(n).fill(0).map((e, index) => new Array(index + 1).fill(0));
dp[0][0] = board[0][0];
for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    dp[i][j] = Math.max(dp[i][j], dp[i - 1][j] + board[i][j]);
    dp[i][j + 1] = Math.max(dp[i][j + 1], dp[i - 1][j] + board[i][j + 1]);
  }
}
console.log(Math.max(...dp[n - 1]));
