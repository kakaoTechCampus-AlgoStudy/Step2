const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const board = input.slice(1).map((e) => e.split(''));

let answer = [];

let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (board[i][j] === '1') {
      answer.push(dfs(i, j, 0));
    }
  }
}
function dfs(x, y, cnt) {
  board[x][y] = '0';
  cnt += 1;
  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    if (-1 < nx && nx < n && -1 < ny && ny < n && board[nx][ny] !== '0') {
      cnt = Math.max(cnt, dfs(nx, ny, cnt));
    }
  }
  return cnt;
}
console.log(answer.length);
answer.sort((a, b) => a - b);
console.log(answer.join('\n'));
