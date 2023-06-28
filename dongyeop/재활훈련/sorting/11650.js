const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
//x좌표 우선 정렬 and y좌표
const sorted = input
  .slice(1)
  .map((e) => e.split(' ').map(Number))
  .sort((a, b) => (a[0] - b[0] === 0 ? a[1] - b[1] : a[0] - b[0]));

let answer = '';
sorted.forEach((e) => (answer += `${e[0]} ${e[1]}\n`));
console.log(answer);
