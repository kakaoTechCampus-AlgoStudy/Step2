const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const T = Number(input[0]);
let curLine = 1;
for (let i = 0; i < T; i++) {
  const C = Number(input[curLine]);
  const arr = [];
  for (let j = curLine + 1; j <= curLine + C; j++) {
    arr.push(input[j].split(' ').map(Number));
  }
  arr.sort((a, b) => a[0] - b[0]);
  let answer = 0;
  let minValue = 1e9;
  for (let [x, y] of arr) {
    if (y < minValue) {
      minValue = y;
      answer += 1;
    }
  }
  console.log(answer);
  curLine += C + 1;
}
