const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const t = Number(input[0]);
let line = 1;
for (let i = 0; i < t; i++) {
  let n = Number(input[line]);
  line++;
  const graph = [0, ...input[line].split(' ').map(Number)];
  const visited = new Array(n + 1).fill(0);
  const finished = new Array(n + 1).fill(0);
  const result = [];
  for (let i = 1; i <= n; i++) {
    isCycle(i, graph, visited, finished, result);
  }

  function isCycle(x, graph, visited, finished, result) {
    visited[x] = 1;
    let next = graph[x];
    if (!visited[next]) {
      isCycle(next, graph, visited, finished, result);
      //방문하였는데 완료되지 않았으면 사이클이 발생한것.
    } else if (!finished[next]) {
      // 사이클에 포함되는 요소들 추가
      while (next != x) {
        result.push(next);
        next = graph[next];
      }
      result.push(x);
    }
    finished[x] = 1;
  }
  line++;
  console.log(n - result.length);
}
