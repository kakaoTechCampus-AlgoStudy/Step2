const fs = require('fs');
const testing = true;
const input = fs.readFileSync(testing ? './test.txt' : './dev/stdin').toString();

let [n, k] = input.split(' ').map(Number);
// 공을 나눠 담는다. 각 바구니에는 최소 1개이상의 공이 들어간다.
// 가장 많이 담긴 바구니와 가장 적게 담긴 바구니의 공의 개수 차이가 최소가 되어야한다.
// 각 바구니에 담긴 공의 개쉬는 모두 달라야한다.
// 즉 가장 많이 담긴 바구니와 가장 적게 담긴 바구니의 공 갯수 차이는 k-1개이다.

// 최소한의 공 갯수는 k 팩토리얼
// 최소한 차이가 나게 해야한다. 추가 공의 갯수가 k! + k개이면 시작지점을 2

const factorial = (n) => {
  let answer = 0;
  for (let i = 1; i <= n; i++) {
    answer += i;
  }
  return answer;
};

if (n < factorial(k)) {
  console.log(-1);
} else {
  n -= factorial(k);
  if (n % k === 0) {
    console.log(k - 1);
  } else {
    console.log(k);
  }
}
