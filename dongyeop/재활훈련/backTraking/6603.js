const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

input.pop();
let answer = '';
for (let i = 0; i < input.length; i++) {
  const testCase = input[i].split(' ').map(Number);
  const n = testCase[0];
  const arr = testCase.slice(1);
  let selected = [];

  function dfs(depth, start) {
    if (depth === 6) {
      answer += selected.join(' ');
      answer += '\n';
      return;
    }
    for (let i = start; i < n; i++) {
      selected.push(arr[i]);
      dfs(depth + 1, i + 1);
      selected.pop();
    }
  }
  dfs(0, 0);
  answer += '\n';
}
console.log(answer);
