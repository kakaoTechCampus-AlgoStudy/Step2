const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim();

let S = Number(input);
let minValue = 1;
let answer = 0;
while (true) {
  if (S - minValue <= minValue + 1) {
    answer += 1;
    break;
  }
  S -= minValue;
  minValue += 1;
  answer += 1;
}

console.log(answer);
