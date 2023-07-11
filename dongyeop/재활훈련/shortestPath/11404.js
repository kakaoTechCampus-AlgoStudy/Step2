const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const m = Number(input[1]);
const board = input.slice(2).map((e) => e.split(' ').map(Number));

const dp = new Array(n + 1).fill(0).map((e) => new Array(n + 1).fill(Infinity));
//자기 자신 0으로 초기화
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < n + 1; j++) {
    if (i === j) {
      dp[i][j] = 0;
    }
  }
}
board.forEach((item) => {
  const [s, e, c] = item;
  dp[s][e] = Math.min(dp[s][e], c);
});

for (let k = 1; k < n + 1; k++) {
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j]);
    }
  }
}

let answer = '';
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < n + 1; j++) {
    if (dp[i][j] === Infinity) {
      answer += '0 ';
    } else {
      answer += `${dp[i][j]} `;
    }
  }
  answer += '\n';
}
console.log(answer);
