const fs = require('fs');
let test = true;
let input = fs
  .readFileSync(test ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

let N = Number(input.shift());

const graph = new Array(N + 1);
const parent = new Array(N + 1).fill(0);

for (let i = 0; i < N + 1; i++) {
  graph[i] = new Array();
}

for (let i = 0; i < N - 1; i++) {
  const [s, e] = input.shift().split(' ').map(Number);
  graph[s].push(e);
  graph[e].push(s);
}

const dfs = (s, graph, parent) => {
  for (const value of graph[s]) {
    // 1번에 연결된 애 => 그다음 노드 그 다음 노드 =>
    if (parent[value] === 0) {
      parent[value] = s;
      dfs(value, graph, parent);
    }
  }
};

dfs(1, graph, parent);
for (let i = 2; i < N + 1; i++) {
  console.log(parent[i]);
}
