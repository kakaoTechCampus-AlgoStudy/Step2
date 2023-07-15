const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const m = Number(input[1]);
const board = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(Infinity));
for (let i = 2; i < 2 + m; i++) {
  const [s, e, c] = input[i].split(' ').map(Number);
  board[s][e] = Math.min(board[s][e], c);
}

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (i === j) board[i][j] = 0;
  }
}

for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      board[i][j] = Math.min(board[i][j], board[i][k] + board[k][j]);
    }
  }
}
let answer = '';
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (board[i][j] === Infinity) {
      answer += '0 ';
    } else {
      answer += `${board[i][j]} `;
    }
  }
  answer += '\n';
}
console.log(answer);
