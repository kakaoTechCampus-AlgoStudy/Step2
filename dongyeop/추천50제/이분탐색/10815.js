const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const numbers = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);
const m = Number(input[2]);
const check_numbers = input[3].split(' ').map(Number);

let answer = [];
for (const number of check_numbers) {
  let left = 0;
  let right = n - 1;
  let flag = false;
  while (left <= right) {
    let mid = parseInt((left + right) / 2);
    if (numbers[mid] < number) {
      left = mid + 1;
    } else if (numbers[mid] > number) {
      right = mid - 1;
    } else {
      flag = true;
      break;
    }
  }
  flag ? answer.push(1) : answer.push(0);
}
console.log(answer.join(' '));
