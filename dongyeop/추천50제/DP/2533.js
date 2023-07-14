//다시 풀어보기
const fs = require('fs');
const testing = true;

const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const graph = new Array(n + 1).fill(0).map(() => new Array());
for (let i = 1; i < n; i++) {
  const [s, e] = input[i].split(' ').map(Number);
  graph[s].push(e);
  graph[e].push(s);
}
const dp = new Array(n + 1).fill(0).map(() => new Array(2).fill(0));
const visited = new Array(n + 1).fill(0);

dfs(1);

console.log(Math.min(dp[1][0], dp[1][1]));
function dfs(cur) {
  visited[cur] = 1;
  dp[cur][0] = 1;
  for (let i = 0; i < graph[cur].length; i++) {
    let child = graph[cur][i];
    if (visited[child]) continue;
    dfs(child);
    dp[cur][1] += dp[child][0];
    dp[cur][0] += Math.min(dp[child][0], dp[child][1]);
  }
}
