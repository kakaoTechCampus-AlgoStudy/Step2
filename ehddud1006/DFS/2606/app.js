const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DFS/2606/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [N] = input.shift();
const [M] = input.shift();

const graph = Array.from({ length: N + 1 }, () => []);
const visited = Array.from({ length: N + 1 }, () => false);
let count = 0;

for (let i = 0; i < M; i++) {
  const [a, b] = input.shift();
  graph[a].push(b);
  graph[b].push(a);
}

visited[1] = true;

const dfs = (v) => {
  for (let i = 0; i < graph[v].length; i++) {
    const nextV = graph[v][i];
    if (!visited[nextV]) {
      visited[nextV] = true;
      count++;
      dfs(nextV);
    }
  }
};

dfs(1);

console.log(count);
