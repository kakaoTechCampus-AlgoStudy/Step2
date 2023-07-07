// 이분탐색
const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

let n = Number(input[0]);
let numbers = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);
let m = Number(input[2]);
let targets = input[3].split(' ').map(Number);

let answer = new Array(m).fill(0);
targets.forEach((target, index) => {
  let start = 0;
  let end = n - 1;
  let maxIndex = -1;
  let minIndex = -1;
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    if (numbers[mid] >= target) {
      end = mid - 1;
    } else {
      start = mid + 1;
      minIndex = mid;
    }
  }
  start = 0;
  end = n - 1;
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    if (numbers[mid] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
      maxIndex = mid;
    }
  }
  if (maxIndex != -1 || minIndex != -1) answer[index] = maxIndex - minIndex;
});
console.log(answer.join(' '));

// 해시
const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

let n = Number(input[0]);
let numbers = input[1].split(' ').map(Number);
let dict = {};
numbers.forEach((number) => {
  dict[number] ? (dict[number] += 1) : (dict[number] = 1);
});
let m = Number(input[2]);
let targets = input[3].split(' ').map(Number);

let answer = new Array(m).fill(0);
targets.forEach((target, index) => {
  if (dict[target]) answer[index] = dict[target];
});
console.log(answer.join(' '));
