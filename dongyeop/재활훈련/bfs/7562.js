class Queue {
  constructor() {
    this.arr = {};
    this.tailIndex = 0;
    this.headIndex = 0;
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
  .split('\n');

let dx = [2, 2, -2, -2, 1, 1, -1, -1];
let dy = [1, -1, 1, -1, 2, -2, 2, -2];

let t = Number(input[0]);
let line = 1;
while (t--) {
  const n = Number(input[line]);
  const visited = Array.from({ length: n }, () => new Array(n).fill(0));
  const [curX, curY] = input[line + 1].split(' ').map(Number);
  const [desX, desY] = input[line + 2].split(' ').map(Number);

  const q = new Queue();
  q.enqueue([curX, curY, 0]);
  visited[curX][curY] = 1;
  while (q.length()) {
    const [x, y, cost] = q.dequeue();
    if (desX === x && desY === y) {
      console.log(cost);
      break;
    }
    for (let i = 0; i < 8; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (-1 < nx && nx < n && -1 < ny && ny < n && visited[nx][ny] === 0) {
        visited[nx][ny] = 1;
        q.enqueue([nx, ny, cost + 1]);
      }
    }
  }

  line += 3;
}
