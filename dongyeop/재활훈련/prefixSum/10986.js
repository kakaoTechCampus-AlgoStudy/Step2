const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const [n, m] = input[0].split(' ').map(Number);
const arr = [0, ...input[1].split(' ').map(Number)];

//최대 n은 100만 m은 1000
// 입력값은 최대 10억 bigInt 써야할수도?
// prefixSum에 나머지만 적어도 됨
let sum = [0];

let result = 0;
for (let i = 1; i <= n; i++) {
  sum[i] = sum[i - 1] + arr[i];
}

let dp = [];
let counter = {};
for (let i = 0; i <= n; i++) {
  dp[i] = sum[i] % m;
  counter[dp[i]] = ~~counter[dp[i]] + 1;
}

// 같은 나머지를 가지는 값을 2가지 선택하는 경우 => 나머지가 0
for (let i = 0; i < m; i++) {
  if (i in counter) result += parseInt((counter[i] * (counter[i] - 1)) / 2);
}

console.log(result);
