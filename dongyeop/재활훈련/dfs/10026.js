const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
// 적록색약이면 R==G 이다.
const board = input.slice(1).map((e) => e.split(''));
const specialBoard = board.map((e) =>
  e.map((item) => {
    if (item === 'G') {
      return 'R';
    }
    return item;
  })
);

let normal = 0;
let special = 0;
let dx = [0, 0, -1, 1];
let dy = [1, -1, 0, 0];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (board[i][j] != 'V') {
      normal += 1;
      dfs(i, j, board[i][j], board);
    }
    if (specialBoard[i][j] != 'V') {
      special += 1;
      dfs(i, j, specialBoard[i][j], specialBoard);
    }
  }
}

function dfs(x, y, target, board) {
  board[x][y] = 'V';
  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    if (-1 < nx && nx < n && -1 < ny && ny < n && board[nx][ny] === target) {
      dfs(nx, ny, target, board);
    }
  }
}
console.log(normal, special);
