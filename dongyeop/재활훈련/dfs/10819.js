let fs = require('fs');
let testing = true;
let input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);
const visited = new Array(n).fill(0);
let permutations = [];
let answer = 0;
dfs([]);
permutations.forEach((arr) => {
  answer = Math.max(answer, calculate(arr));
});
console.log(answer);
// 순열
function calculate(arr) {
  let answer = 0;
  for (let i = 0; i < n - 1; i++) {
    answer += Math.abs(arr[i] - arr[i + 1]);
  }
  return answer;
}
function dfs(selected) {
  if (selected.length === n) {
    permutations.push(selected);
    return;
  }
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    visited[i] = 1;
    dfs([...selected, arr[i]]);
    visited[i] = 0;
  }
}
