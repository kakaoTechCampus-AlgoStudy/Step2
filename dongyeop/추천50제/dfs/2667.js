const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const board = input.slice(1).map((item) => item.split('').map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let answer = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (board[i][j]) {
      answer.push(dfs(i, j, 0));
    }
  }
}
answer.sort((a, b) => a - b);
console.log(answer.length);
console.log(answer.join('\n'));
function dfs(x, y, counter) {
  board[x][y] = 0;
  counter += 1;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (-1 < nx && nx < n && -1 < ny && ny < n && board[nx][ny]) {
      counter = Math.max(counter, dfs(nx, ny, counter));
    }
  }
  return counter;
}
