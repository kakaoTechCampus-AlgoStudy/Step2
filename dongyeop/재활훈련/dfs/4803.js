const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

let line = 0;
let t = 1;
while (true) {
  const [n, m] = input[line].split(' ').map(Number);
  if (n == 0 && m == 0) break;
  const vertex = Array.from({ length: n + 1 }, () => new Array());
  const visited = new Array(n + 1).fill(0);
  line++;
  for (let i = 0; i < m; i++) {
    const [a, b] = input[line].split(' ').map(Number);
    vertex[a].push(b);
    vertex[b].push(a);
    line++;
  }
  let counter = 0;
  for (let i = 1; i < n + 1; i++) {
    if (visited[i]) continue;
    if (!isCycle(i, 0)) counter++;
  }
  function isCycle(cur, prev) {
    visited[cur] = 1;
    for (const next of vertex[cur]) {
      if (!visited[next]) {
        if (isCycle(next, cur)) return true;
      } else if (next != prev) return true;
    }
    return false;
  }
  if (counter === 0) {
    console.log(`Case ${t}: No trees.`);
  } else if (counter === 1) {
    console.log(`Case ${t}: There is one tree.`);
  } else {
    console.log(`Case ${t}: A forest of ${counter} trees.`);
  }

  t++;
}
