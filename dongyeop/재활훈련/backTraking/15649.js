const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim();

const [n, m] = input.split(' ').map(Number);

let answer = [];

const dfs = (arr) => {
  if (arr.length === m) answer.push(arr);
  for (let i = 1; i <= n; i++) {
    if (!arr.includes(i)) {
      dfs([...arr, i]);
    }
  }
};
dfs([]);

console.log(answer.map((value) => value.join(' ')).join('\n'));
