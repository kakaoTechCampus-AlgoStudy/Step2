const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const [n, m, h] = input[0].split(' ').map(Number);
const blocks = [[]];
for (let i = 1; i <= n; i++) {
  blocks.push(input[i].split(' ').map(Number));
}

const dp = new Array(n + 1).fill(0).map((e) => [1, ...new Array(h).fill(0)]);

// n번째 학생일때 j 높이 탑을 만들수 있는 경우의 수
// 완탐시 최대 11^50 완탐 불가.
for (let i = 1; i <= n; i++) {
  // 0부터 h까지 모든 높이에 대하여 처리
  for (let j = 1; j <= h; j++) {
    for (let k = 0; k < blocks[i].length; k++) {
      //j는 현재높이
      if (blocks[i][k] <= j) {
        dp[i][j] = (dp[i][j] + dp[i - 1][j - blocks[i][k]]) % 10007;
      }
    }
    dp[i][j] = (dp[i][j] + dp[i - 1][j]) % 10007;
  }
}
console.log(dp[n][h]);
// // 1000* 50 * 10
