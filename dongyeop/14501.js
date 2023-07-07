const fs = require('fs');
let test = true;
let input = fs
  .readFileSync(test ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

// N+1일째 퇴사하기 위해 최대한 많은 상담
// 상담 완료 기간 T와 금액 P
// 최대 수익을 구하라

const N = Number(input.shift());
const dp = new Array(N + 1).fill(0);
const T = [];
const C = [];
for (let i = 0; i < N; i++) {
  const [t, c] = input.shift().split(' ').map(Number);
  T.push(t);
  C.push(c);
}

for (let i = N - 1; i > -1; i--) {
  if (i + T[i] > N) {
    dp[i] = dp[i + 1];
  } else {
    dp[i] = Math.max(dp[i + 1], C[i] + dp[i + T[i]]);
  }
}

// 거꾸로 가야한다 why? => 비용을 더해줘야하기떄문에
// 앞에서 부터 가면 dp가 비어있음
console.log(dp[0]);
