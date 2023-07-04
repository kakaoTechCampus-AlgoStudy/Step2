const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const [n, m] = input[0].split(' ').map(Number);
const vertex = Array.from({ length: n + 1 }, () => new Array());
let line = 0;

for (let i = 0; i < n - 1; i++) {
  line++;
  const [a, b, d] = input[line].split(' ').map(Number);
  vertex[a].push([b, d]);
  vertex[b].push([a, d]);
}
for (let i = 0; i < m; i++) {
  line++;
  const visited = new Array(n + 1).fill(0);
  const distance = new Array(n + 1).fill(0);
  const [s, e] = input[line].split(' ').map(Number);

  function dfs(cur, cost, end) {
    if (visited[cur]) return;
    visited[cur] = 1;
    distance[cur] = cost;
    for (const next of vertex[cur]) {
      dfs(next[0], cost + next[1], end);
    }
  }
  dfs(s, 0, e);
  console.log(distance[e]);
}
