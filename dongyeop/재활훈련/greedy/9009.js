const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const data = input.slice(1).map(Number);
const fibo = [1, 2];
while (fibo[fibo.length - 1] < 1e9) {
  fibo.push(fibo[fibo.length - 2] + fibo[fibo.length - 1]);
}
for (let i = 0; i < n; i++) {
  let target = data[i];
  let result = [];
  let index = fibo.length - 1;
  while (target > 0) {
    if (target >= fibo[index]) {
      target -= fibo[index];
      result.push(fibo[index]);
    }
    index--;
  }
  console.log(result.reverse().join(' '));
}
