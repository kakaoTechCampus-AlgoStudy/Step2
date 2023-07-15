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
    this.headIndex += 1;
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

const [n, m] = input[0].split(' ').map(Number);
const students = new Array(n + 1).fill(0).map(() => []);
const indegree = new Array(n + 1).fill(0);
const answer = [];
for (let i = 1; i <= m; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  students[a].push(b);
  indegree[b] += 1;
}
const q = new Queue();

for (let i = 1; i <= n; i++) {
  if (indegree[i] === 0) {
    q.enq(i);
  }
}

while (q.length()) {
  const cur = q.deq();
  answer.push(cur);
  for (const next of students[cur]) {
    indegree[next] -= 1;
    if (indegree[next] === 0) {
      q.enq(next);
    }
  }
}
console.log(answer.join(' '));
