const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const [n, x] = input[0].split(' ').map(Number);
const visitor = input[1].split(' ').map(Number);

let counter = 1;
let max = visitor.slice(0, x).reduce((a, b) => a + b);
let start = 0;
let end = x - 1;
let curValue = max;
while (end < n - 1) {
  ++end;
  curValue = curValue - visitor[start] + visitor[end];

  if (max === curValue) {
    counter += 1;
  } else if (curValue > max) {
    max = curValue;
    counter = 1;
  }
  ++start;
}

if (max != 0) {
  console.log(max);
  console.log(counter);
} else {
  console.log('SAD');
}
