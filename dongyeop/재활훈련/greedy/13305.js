const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const distance = input[1].split(' ').map(Number);
const costs = input[2].split(' ').map(Number);
let answer = BigInt(0);
let mincosts = costs[0];
// 자기 보다 뒤에 있는 주요소가 더 비싸면 해당 주요소를 minvalue값으로 변환시켜줌 why? 어짜피 거기선 안넣을꺼

for (let i = 1; i < n; i++) {
  if (costs[i] < mincosts) {
    mincosts = costs[i];
  } else {
    costs[i] = mincosts;
  }
}
for (let i = 0; i < n - 1; i++) {
  answer += BigInt(costs[i]) * BigInt(distance[i]);
}
console.log(String(answer));
