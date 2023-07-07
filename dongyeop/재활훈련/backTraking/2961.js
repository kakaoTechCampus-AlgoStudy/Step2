const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const tastes = input.slice(1).map((e) => e.split(' ').map(Number));

// 신맛은 맛의 곱 / 쓴맛은 ㅎ맛의 합
// 신맛과 쓴맛의 차이를 최소가 되게 하여야하며 모든 재료를 사용해야 한다.
// 신맛과 쓴맛의 최대값 10억 1000000000
let answer = 1e9;
let visited = new Array(n).fill(0);
let results = [];

function dfs(depth, start) {
  if (depth == n) {
    const [s, b] = results.reduce(
      (prev, cur) => {
        return [prev[0] * tastes[cur][0], prev[1] + tastes[cur][1]];
      },
      [1, 0]
    );
    answer = Math.min(answer, Math.abs(s - b));
  }
  for (let i = start; i < n; i++) {
    if (visited[i]) continue;
    visited[i] = 1;
    results.push(i);
    dfs(depth + 1, i + 1);
    visited[i] = 0;
    results.pop();
    dfs(depth + 1, i + 1);
  }
}
dfs(0, 0);

console.log(answer);
