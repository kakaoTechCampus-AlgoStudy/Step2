const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim();
let [a, b] = input.split(' ').map(Number);

let answer = 0;
let flag = false;
while (b > a) {
  if (b % 10 === 1) {
    b = Math.floor(b / 10);
  } else if (b % 2 === 0) {
    b = Math.floor(b / 2);
  } else {
    flag = true;
    break;
  }
  answer += 1;
}
if (flag) {
  console.log(-1);
} else {
  a === b ? console.log(answer + 1) : console.log(-1);
}
