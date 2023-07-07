const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const k = Number(input[1]);

let start = 1;
let end = n * n;

let answer = 0;
// mid보다 작은것의 수가 k개이면 mid가 k번째 수
while (start <= end) {
  let mid = parseInt((start + end) / 2);
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += Math.min(parseInt(mid / i), n);
  }
  if (total >= k) {
    answer = mid;
    end = mid - 1;
  } else {
    start = mid + 1;
  }
}
console.log(answer);
