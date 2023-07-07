const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const signs = input[1].split(' ');

let selected = [];
let visited = new Array(10).fill(0);
let min = 1e10;
let max = 0;

function dfs(depth) {
  if (depth === n) {
    const target = Number(selected.join(''));
    max = Math.max(target, max);
    min = Math.min(target, min);
  }
  for (let i = 0; i < 10; i++) {
    if (visited[i]) continue;
    visited[i] = 1;
    selected.push(i);
    if (eval(selected[selected.length - 2] + signs[depth] + selected[selected.length - 1])) {
      dfs(depth + 1);
    }
    visited[i] = 0;
    selected.pop();
  }
}
for (let i = 0; i < 10; i++) {
  visited[i] = 1;
  selected.push(i);
  dfs(0);
  visited[i] = 0;
  selected.pop();
}

console.log(max);
console.log(String(min).padStart(n + 1, '0'));
