const fs = require('fs');
const testing = true;
const input = fs.readFileSync(testing ? './test.txt' : './dev/stdin').toString();

const n = Number(input);

const dp = new Array(n + 1).fill(0).map((e) => new Array(10).fill(0));

for (let i = 1; i < n + 1; i++) {
  for (let j = 0; j < 10; j++) {
    if (i === 1) {
      if (j != 0) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = 0;
      }
    } else {
      if (j == 0) {
        dp[i][j] = dp[i - 1][j + 1];
      } else if (j == 9) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j + 1];
      }
      dp[i][j] %= Number(1e9);
    }
  }
}
let answer = 0;
dp[n].forEach((value) => {
  answer += value;
  answer %= Number(1e9);
});
console.log(answer);
