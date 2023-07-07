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
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

let t = Number(input[0]);
let line = 1;
while (t--) {
  const [v, e] = input[line].split(' ').map(Number);
  const vertex = new Array(v + 1).fill(0).map((e) => []);
  const visited = new Array(v + 1).fill(-1);
  for (let i = 1; i <= e; i++) {
    const [a, b] = input[line + i].split(' ').map(Number);
    vertex[a].push(b);
    vertex[b].push(a);
  }
  for (let i = 1; i <= v; i++) {
    if (visited[i] === -1) bfs(i, visited, vertex);
  }
  if (isDivided(visited, vertex)) console.log('YES');
  else {
    console.log('NO');
  }
  line += e + 1;
}

function bfs(cur, visited, vertex) {
  const q = new Queue();
  q.enqueue(cur);
  visited[cur] = 0;
  while (q.length()) {
    const node = q.dequeue();
    for (const next of vertex[node]) {
      if (visited[next] == -1) {
        visited[next] = (visited[node] + 1) % 2;
        q.enqueue(next);
      }
    }
  }
}

function isDivided(visited, vertex) {
  for (let x = 1; x < visited.length; x++) {
    for (let y of vertex[x]) {
      if (visited[x] === visited[y]) return false;
    }
  }
  return true;
}
