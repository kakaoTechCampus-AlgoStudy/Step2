const fs = require('fs');
const testing = true;

const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const [n, m] = input[0].split(' ').map(Number);
const board = [new Array(m + 1).fill(0)];
for (let i = 1; i <= n; i++) {
  board.push([0, ...input[i].split(' ').map(Number)]);
}
let dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    dp[i][j] = board[i][j] + dp[i][j - 1] + dp[i - 1][j] - dp[i - 1][j - 1];
  }
}

const k = Number(input[1 + n]);
let quries = [];
for (let line = n + 2; line < n + 2 + k; line++) {
  const [i, j, x, y] = input[line].split(' ').map(Number);
  quries.push([i, j, x, y]);
}

quries.forEach((value) => {
  const [i, j, x, y] = value;
  console.log(dp[x][y] - dp[i - 1][y] - dp[x][j - 1] + dp[i - 1][j - 1]);
});
