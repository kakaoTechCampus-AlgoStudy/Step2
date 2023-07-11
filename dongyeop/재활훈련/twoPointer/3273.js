const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const arr = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);
const x = Number(input[2]);

let start = 0;
let end = n - 1;
let answer = 0;
// arr에서
while (start < end) {
  while (end > 0 && arr[start] + arr[end] > x) {
    end--;
  }
  if (arr[start] + arr[end] === x) {
    answer += 1;
    end -= 1;
  }
  start++;
}
console.log(answer);
