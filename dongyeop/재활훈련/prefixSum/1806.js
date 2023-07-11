const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const [n, s] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
const dp = [0];
let sum = 0;
for (let i = 0; i < n; i++) {
  sum += arr[i];
  dp.push(sum);
}
let left = 1;
let right = 1;
let answer = Infinity;

while (right <= n) {
  if (dp[right] - dp[left - 1] >= s) {
    answer = Math.min(answer, right - left + 1);
    left++;
  } else {
    right++;
  }
}
console.log(answer === Infinity ? 0 : answer);
