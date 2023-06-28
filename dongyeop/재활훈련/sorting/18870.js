const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');
const n = Number(input[0]);
const arr = [...new Set(input[1].split(' ').map(Number))];
const sorted = arr.sort((a, b) => a - b);
const rank = {};
sorted.forEach((e, index) => {
  rank[e] = index;
});

const answer = [];
input[1].split(' ').forEach((e) => {
  answer.push(rank[e]);
});
console.log(answer.join(' '));
