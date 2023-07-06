const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DFS/1240/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [N, M] = input.shift();

const graph = Array.from({ length: N + 1 }, () => []);
let answer = [];

for (let i = 0; i < N - 1; i++) {
  const [a, b, dist] = input.shift();
  graph[a].push([b, dist]);
  graph[b].push([a, dist]);
}

for (let i = 0; i < M; i++) {
  const visited = Array.from({ length: N + 1 }, () => false);
  const [a, b] = input.shift();
  visited[a] = true;
  dfs(a, b, 0, visited);
}

function dfs(v, end, d, visited) {
  if (v === end) {
    answer.push(d);
    return;
  }

  for (let i = 0; i < graph[v].length; i++) {
    const [nextV, dist] = graph[v][i];
    if (!visited[nextV]) {
      visited[nextV] = true;
      dfs(nextV, end, d + dist, visited);
      //   visited[nextV] = false; 이 코드가 없어도 되는 이유는 노드 A 와 노드 B 를 잇는 경로가 하나밖에 없어 되돌아가지 않아도 되기때문이다.
    }
  }
}

console.log(answer.join("\n"));
