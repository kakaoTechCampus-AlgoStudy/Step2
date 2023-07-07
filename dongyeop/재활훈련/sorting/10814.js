const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
// 가입한 사람들의 나이와 이름이 가입한 순서대로 주어진다.
// 나이순으로 정렬하고 나이가 같으면 먼저 가입한 사람이 앞에오는 순서
const arr = input.slice(1).map((e) => e.split(' '));

const sorted = arr.sort((a, b) => Number(a[0]) - Number(b[0]));
const answer = [];
sorted.forEach((e) => {
  answer.push(e.join(' '));
});
console.log(answer.join('\n'));
