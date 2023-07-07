const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

//t지나온 알파벳으로는 다시 갈수없음
// 말은 상하좌우로 이동 가능
let [r, c] = input[0].split(' ').map(Number);
const board = input.slice(1);
let answer = 1;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
const visited = new Array(26).fill(0);
visited[board[0][0].charCodeAt() - 65] = 1;

function dfs(x, y, cnt) {
  answer = Math.max(answer, cnt);
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (-1 < nx && nx < r && -1 < ny && ny < c && !visited[board[nx][ny].charCodeAt() - 65]) {
      visited[board[nx][ny].charCodeAt() - 65] = 1;
      dfs(nx, ny, cnt + 1);
      visited[board[nx][ny].charCodeAt() - 65] = 0;
    }
  }
}
dfs(0, 0, 1);
console.log(answer);
