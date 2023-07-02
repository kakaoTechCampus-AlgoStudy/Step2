const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');
const n = Number(input[0]);
const board = input.slice(1).map((e) => e.split(' ').map(Number));
let visited = [];
let answer = 1e7;

function dfs(cur, cost, start) {
  if (visited.length === n) {
    if (board[cur][start] != 0) {
      answer = Math.min(cost + board[cur][start], answer);
    }
    return;
  }
  for (let i = 0; i < n; i++) {
    if (visited.includes(i) || board[cur][i] === 0) continue;
    visited.push(i);
    dfs(i, cost + board[cur][i], start);
    visited.pop();
  }
}

for (let i = 0; i < n; i++) {
  visited.push(i);
  dfs(i, 0, i);
  visited.pop();
}

console.log(answer);
