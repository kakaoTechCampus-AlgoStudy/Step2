const fs = require('fs');

const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

// p에서 시작
// 상하좌우 대각선으로 이동 가능 8방향
// 마지막 편지 배달 후 다시 돌아와야함.

// 가장 높은 칸과 가장 낮은 칸의 고도 차이를 피로도

let n = Number(input[0]);
let arr = [];
for (let i = 1; i <= n; i++) {
  arr.push(input[i].split(''));
}
let height = [];
for (let i = n + 1; i <= n + n; i++) {
  height.push(input[i].split(' ').map(Number));
}

let dx = [-1, -1, -1, 0, 0, 1, 1, 1];
let dy = [-1, 0, 1, -1, 1, -1, 0, 1];

let uniqueHeight = new Set();
let target = 0;
let result = 1e9;
let startX = 0;
let startY = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    uniqueHeight.add(height[i][j]);
    if (arr[i][j] == 'P') {
      startX = i;
      startY = j;
    }
    if (arr[i][j] === 'K') target += 1;
  }
}
uniqueHeight = [...uniqueHeight];
uniqueHeight.sort((a, b) => a - b);
let left = 0;
let right = 0;
let middle = 0;
let cnt = 0;
let visited = new Array(n).fill(0).map(() => new Array(n).fill(false));
for (let i = 0; i < uniqueHeight.length; i++) {
  if (uniqueHeight[i] === height[startX][startY]) {
    right = i;
    middle = i;
    break;
  }
}
while (true) {
  while (true) {
    visited = new Array(n).fill(0).map(() => new Array(n).fill(false));
    cnt = 0;
    dfs(startX, startY);
    if (right < uniqueHeight.length - 1 && cnt < target) right += 1;
    else break;
  }
  if (cnt === target) {
    result = Math.min(result, uniqueHeight[right] - uniqueHeight[left]);
  }
  left += 1;
  if (left > middle || right >= uniqueHeight.length) break;
}
console.log(result);

function dfs(x, y) {
  visited[x][y] = true;
  if (arr[x][y] == 'K') cnt += 1;
  for (let i = 0; i < 8; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    if (-1 < nx && nx < n && -1 < ny && ny < n && !visited[nx][ny]) {
      if (height[nx][ny] >= uniqueHeight[left] && height[nx][ny] <= uniqueHeight[right]) {
        dfs(nx, ny);
      }
    }
  }
}
