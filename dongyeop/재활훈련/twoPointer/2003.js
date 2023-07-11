const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const [n, m] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

let start = 0;
let end = 0;
let curValue = arr[start];
let answer = 0;
while (start < n) {
  while (end < n) {
    if (curValue < m) {
      end++;
      curValue += arr[end];
      continue;
    }
    if (curValue === m) {
      answer += 1;
    }
    break;
  }

  curValue -= arr[start];
  start++;
}

console.log(answer);
