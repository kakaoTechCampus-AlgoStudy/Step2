const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim();

let n = Number(input);
let answer = 0;
while (true) {
  if (n < 3) {
    n === 0 ? console.log(answer) : console.log(-1);
    break;
  } else if (n % 5 === 0) {
    answer += Math.floor(n / 5);
    console.log(answer);
    break;
  } else {
    n -= 3;
    answer += 1;
  }
}
