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
  peek() {
    return this.arr[this.tailIndex];
  }
  length() {
    return this.tailIndex - this.headIndex;
  }
}

const fs = require('fs');
const testing = true;
const input = fs.readFileSync(testing ? './test.txt' : './dev/stdin').toString();

const [n, k] = input.split(' ').map(Number);
const visited = new Array(100000).fill(0);
// 숨바꼭질 => N
// +- 1 or x*2
bfs(n);
function bfs(start) {
  const q = new Queue();
  q.enqueue([start, 0]);
  while (q.length()) {
    const [cur, time] = q.dequeue();
    visited[cur] = 1;
    if (cur === k) {
      console.log(time);
      break;
    }
    if (-1 < cur + 1 && cur + 1 < 100001 && !visited[cur + 1]) {
      q.enqueue([cur + 1, time + 1]);
    }
    if (-1 < cur - 1 && cur - 1 < 100001 && !visited[cur - 1]) {
      q.enqueue([cur - 1, time + 1]);
    }
    if (-1 < cur * 2 && cur * 2 < 100001 && !visited[cur * 2]) {
      q.enqueue([cur * 2, time + 1]);
    }
  }
}
