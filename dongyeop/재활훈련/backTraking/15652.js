const fs = require('fs');
const testing = true;
const [n, m] = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

let answer = '';
const selected = [];
function dfs(arr, start, depth) {
  if (selected.length === m) {
    answer += selected.join(' ');
    answer += '\n';
    return;
  }
  for (let i = start; i < n; i++) {
    selected.push(arr[i]);
    dfs(arr, i, depth + 1);
    selected.pop();
  }
}
dfs(
  new Array(n).fill(0).map((item, index) => index + 1),
  0,
  0
);
console.log(answer);
