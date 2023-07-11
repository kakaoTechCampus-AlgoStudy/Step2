const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

// 직접 친구이거나 k를 거쳐서 j를 갈수있으면 2-친구가 될수있다.
// 플루이드 와샬

const n = Number(input[0]);
const board = input.slice(1).map((item) =>
  item.split('').map((e) => {
    if (e === 'N') return 0;
    else return 1;
  })
);

const dp = new Array(n).fill(0).map((e) => new Array(n).fill(0));

for (let k = 0; k < n; k++) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 1) {
        dp[i][j] = 1;
      }
      if (i !== j && board[i][k] != 0 && board[k][j] != 0) {
        dp[i][j] = 1;
      }
    }
  }
}

let answer = 0;
dp.forEach((item) => {
  answer = Math.max(
    answer,
    item.reduce((a, b) => a + b)
  );
});
console.log(answer);
