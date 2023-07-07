const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim();

const n = Number(input);
let answer = '';
const selected = [];

function dfs() {
  if (selected.length === n) {
    answer += selected.join(' ');
    answer += '\n';
    return;
  }
  for (let i = 1; i <= n; i++) {
    if (!selected.includes(i)) {
      selected.push(i);
      dfs();
      selected.pop();
    }
  }
}
dfs();
console.log(answer);
