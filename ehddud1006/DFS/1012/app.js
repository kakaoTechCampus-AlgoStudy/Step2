const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DFS/1012/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [T] = input.shift();

for (let i = 0; i < T; i++) {
  const [M, N, K] = input.shift();
  const graph = Array.from({ length: N }, () => Array(M).fill(0));
  let count = 0;

  for (let j = 0; j < K; j++) {
    const [y, x] = input.shift();
    graph[x][y] = 1;
  }

  for (let a = 0; a < N; a++) {
    for (let b = 0; b < M; b++) {
      if (graph[a][b] === 1) {
        count++;
        dfs(a, b);
      }
    }
  }

  function dfs(nx, ny) {
    if (nx <= -1 || nx >= N || ny <= -1 || ny >= M || graph[nx][ny] === 0)
      return;

    graph[nx][ny] = 0;

    dfs(nx - 1, ny);
    dfs(nx, ny + 1);
    dfs(nx + 1, ny);
    dfs(nx, ny - 1);
  }

  console.log(count);
}
