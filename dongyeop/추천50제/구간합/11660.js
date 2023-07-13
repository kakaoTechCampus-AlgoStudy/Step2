const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const [n, m] = input[0].split(' ').map(Number);
const board = new Array(n + 1).fill(0).map(() => new Array(n + 1));
const sum = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));
let answer = '';
for (let i = 1; i <= n; i++) {
  board[i] = [0, ...input[i].split(' ').map(Number)];
}

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    sum[i][j] = board[i][j] + sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1];
  }
}

for (let i = n + 1; i <= n + m; i++) {
  const [x1, y1, x2, y2] = input[i].split(' ').map(Number);
  answer += `${sum[x2][y2] - sum[x2][y1 - 1] - sum[x1 - 1][y2] + sum[x1 - 1][y1 - 1]}\n`;
}
console.log(answer);
