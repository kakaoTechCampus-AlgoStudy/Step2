const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const t = input[0];
let line = 0;
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

for (let i = 0; i < t; i++) {
  line += 1;
  let answer = 0;
  const [c, r, k] = input[line].split(' ').map(Number);
  const board = Array.from({ length: r }, () => new Array(c).fill(0));
  for (let j = 0; j < k; j++) {
    line += 1;
    const [x, y] = input[line].split(' ').map(Number);
    board[y][x] = 1;
  }

  for (let y = 0; y < r; y++) {
    for (let x = 0; x < c; x++) {
      if (board[y][x]) {
        dfs(x, y, r, c, board);
        answer += 1;
      }
    }
  }
  console.log(answer);
}

function dfs(x, y, r, c, board) {
  board[y][x] = 0;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (-1 < nx && nx < c && -1 < ny && ny < r && board[ny][nx]) {
      dfs(nx, ny, r, c, board);
    }
  }
}
