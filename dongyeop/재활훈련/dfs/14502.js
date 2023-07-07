const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');
const [n, m] = input[0].split(' ').map(Number);
const board = input.slice(1).map((e) => e.split(' ').map(Number));
// 벽을세워야한다.
// 벽을 세울수 있는 좌표를 구한 다음 3개 조합 만듬.
// 그 다음 완탐하여 안전영역이 가장 큰 경우를 구하자?
let dx = [0, 0, -1, 1];
let dy = [1, -1, 0, 0];
let answer = 0;
setWall(0, board);
console.log(answer);
function setWall(depth, board) {
  if (depth === 3) {
    let temp = 0;
    const copyBoard = board.map((e) => [...e]);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (copyBoard[i][j] === 2) {
          spread(i, j, copyBoard);
        }
      }
    }
    for (let i = 0; i < n; i++) {
      temp += copyBoard[i].filter((e) => e === 0).length;
    }
    answer = Math.max(answer, temp);
    return;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 0) {
        board[i][j] = 1;
        setWall(depth + 1, board);
        board[i][j] = 0;
      }
    }
  }
}

function spread(x, y, copyBoard) {
  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    if (-1 < nx && nx < n && -1 < ny && ny < m && copyBoard[nx][ny] === 0) {
      copyBoard[nx][ny] = 2;
      spread(nx, ny, copyBoard);
    }
  }
}
