const fs = require('fs');
const testing = true;
const [n, m] = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split(' ')
  .map(Number);

let answer = '';

function dfs(arr, depth) {
  if (arr.length === m) {
    answer += arr.join(' ');
    answer += '\n';
    return;
  } else {
    for (let i = 1; i <= n; i++) {
      dfs([...arr, i], depth + 1);
    }
  }
}
dfs([], 0);
console.log(answer);
