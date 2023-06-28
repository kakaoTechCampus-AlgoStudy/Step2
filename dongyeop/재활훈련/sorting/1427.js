const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim();

console.log(
  input
    .split('')
    .map(Number)
    .sort((a, b) => b - a)
    .join('')
);

// 정렬을 하지 않고도 풀수있음.
// 각 자리수마다 나오는 빈도수를 체크하고
// 9부터 빈도수만큼 출력하면됨.
