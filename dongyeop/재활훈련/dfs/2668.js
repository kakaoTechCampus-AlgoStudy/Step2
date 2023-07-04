const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

// 가장 큰 사이클을 이루는 경우를 찾아라.
const n = Number(input[0]);
const targets = [0, ...input.slice(1).map(Number)];
let visited = new Array(n + 1).fill(0);
let finished = new Array(n + 1).fill(0);

let result = [];
for (let i = 1; i < n + 1; i++) {
  if (!visited[i]) dfs(i, targets, visited, finished, result);
}
function dfs(cur, targets, visited, finished, result) {
  visited[cur] = 1;
  let next = targets[cur];
  if (!visited[next]) {
    dfs(next, targets, visited, finished, result);
  } else if (!finished[next]) {
    while (cur !== next) {
      result.push(next);
      next = targets[next];
    }
    result.push(cur);
  }
  finished[cur] = 1;
  return;
}

console.log(result.length);
result.sort((a, b) => a - b);
result.forEach((e) => {
  console.log(e);
});
