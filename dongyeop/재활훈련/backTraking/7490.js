const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

let answer = '';
const t = Number(input[0]);
for (let i = 1; i <= t; i++) {
  dfs('1', 2, Number(input[i]) + 1);
  answer += '\n';
}

function dfs(expression, depth, end) {
  if (depth === end) {
    if (eval(expression.replace(/ /g, '')) === 0) {
      answer += expression + '\n';
    }
    return;
  } else {
    dfs(expression + ' ' + depth, depth + 1, end);
    dfs(expression + '+' + depth, depth + 1, end);
    dfs(expression + '-' + depth, depth + 1, end);
  }
}
console.log(answer);
