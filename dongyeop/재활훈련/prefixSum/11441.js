const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);
const m = Number(input[2]);
const p = [0];
let sum = 0;
for (let i = 0; i < n; i++) {
  sum += arr[i];
  p.push(sum);
}
let answer = '';
for (let i = 3; i < m + 3; i++) {
  const [s, e] = input[i].split(' ').map(Number);
  answer += `${p[e] - p[s - 1]}\n`;
}
console.log(answer);
