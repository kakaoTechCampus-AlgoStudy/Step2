const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');
const n = Number(input[0]);
const v = Number(input[1]);
const vertex = Array.from({ length: n + 1 }, () => new Array());
for (let i = 0; i < v; i++) {
  const [a, b] = input[i + 2].split(' ').map(Number);
  vertex[a].push(b);
  vertex[b].push(a);
}

let answer = 0;
const visited = new Array(n + 1).fill(0);
visited[1] = 1;
function dfs(cur) {
  for (const node of vertex[cur]) {
    if (visited[node]) continue;
    answer += 1;
    visited[node] = 1;
    dfs(node);
  }
}
dfs(1);
console.log(answer);
