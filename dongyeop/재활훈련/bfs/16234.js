class Queue {
  constructor() {
    this.arr = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }
  enqueue(x) {
    this.arr[this.tailIndex] = x;
    this.tailIndex++;
  }
  dequeue() {
    const target = this.arr[this.headIndex];
    delete this.arr[this.headIndex];
    this.headIndex++;
    return target;
  }
  length() {
    return this.tailIndex - this.headIndex;
  }
  peek() {
    return this.arr[this.tailIndex];
  }
}

const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

// 인접한 국가중 인구차이가 l명 이상 r명 이하라면 이동 가능
// 국경선이 열리면 연합으로 처리
// 국경선이 열리면 각 나라의 인구수는 연합의 인구수/ 연합을 이루고 있는 칸수가 된다.

const [n, l, r] = input[0].split(' ').map(Number);
const board = input.slice(1).map((e) => e.split(' ').map(Number));
let visited = new Array(n).fill(0).map((e) => new Array(n).fill(0));
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let answer = 0;
while (true) {
  let flag = true;
  let log = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j]) {
        const result = bfs(i, j);
        if (result.length > 1) flag = false;
        log.push(result);
      }
    }
  }
  if (flag) {
    break;
  } else {
    visited = new Array(n).fill(0).map((e) => new Array(n).fill(0));
    log.forEach((item) => {
      personMove(item);
    });
    answer += 1;
  }
}
console.log(answer);

function personMove(result) {
  const unionSize = result.length;
  const unionSum = result.reduce((prev, cur) => {
    return prev + board[cur[0]][cur[1]];
  }, 0);
  result.forEach((item) => {
    board[item[0]][item[1]] = Math.floor(unionSum / unionSize);
  });
}
function bfs(x, y) {
  const q = new Queue();
  const result = [[x, y]];
  q.enqueue([x, y]);
  visited[x][y] = 1;
  while (q.length()) {
    const [curX, curY] = q.dequeue();
    for (let i = 0; i < 4; i++) {
      const nx = curX + dx[i];
      const ny = curY + dy[i];
      if (-1 < nx && nx < n && -1 < ny && ny < n) {
        if (visited[nx][ny]) continue;
        if (l <= Math.abs(board[nx][ny] - board[curX][curY]) && Math.abs(board[nx][ny] - board[curX][curY]) <= r) {
          visited[nx][ny] = 1;
          q.enqueue([nx, ny]);
          result.push([nx, ny]);
        }
      }
    }
  }
  return result;
}
