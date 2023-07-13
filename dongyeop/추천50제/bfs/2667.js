class Queue {
  constructor() {
    this.arr = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }
  enq(x) {
    this.arr[this.tailIndex] = x;
    this.tailIndex += 1;
  }
  deq() {
    const target = this.arr[this.headIndex];
    delete this.arr[this.headIndex];
    this.headIndex++;
    return target;
  }
  length() {
    return this.tailIndex - this.headIndex;
  }
}

const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const board = input.slice(1).map((item) => item.split('').map(Number));
const answer = [];
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (board[i][j] !== 0) {
      answer.push(bfs(i, j));
    }
  }
}
answer.sort((a, b) => a - b);
console.log(answer.length);
console.log(answer.join('\n'));

function bfs(x, y) {
  const q = new Queue();
  q.enq([x, y]);
  board[x][y] = 0;
  let counter = 1;
  while (q.length()) {
    const [curx, cury] = q.deq();
    for (let i = 0; i < 4; i++) {
      const nx = curx + dx[i];
      const ny = cury + dy[i];
      if (-1 < nx && nx < n && -1 < ny && ny < n && board[nx][ny]) {
        board[nx][ny] = 0;
        counter += 1;
        q.enq([nx, ny]);
      }
    }
  }
  return counter;
}
