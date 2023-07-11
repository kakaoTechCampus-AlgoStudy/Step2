const fs = require('fs');
const testing = true;

const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const [n, k] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

let counter = 0;
//수열 s에서 원하는 위치에 있는 수를 골라 k번 삭제 가능.

let start = 0;
let end = 0;
let max = 0;
// 짝수를 만나면 스타트지점 초기화
// 이후 진행방향으로 가면서 홀수이면 k-1
// k가 0이 되었고 더이상 이동할수있는 짝수가 없으면 수열의 길이 업데이트
// 스타트 이후 짝수를 찾아서 카운트

// while (start < n) {
//   let temp = 0;
//   // 처음 짝수인 위치 찾기
//   for (let i = start; i < n; i++) {
//     if (arr[i] % 2 != 0) {
//       counter += 1;
//       start += 1;
//       break;
//     }
//   }
//   // 엔드를 슬라이딩 시키며 최대 배열 길이 구하기.
//   for (let i = end; i < n; i++) {
//     if (arr[i] % 2 != 0) {
//       // 짝수가 아닌것을 만났고 counter가 0이면 초기화
//       if (counter == 0) break;
//       // 짝수가 아닌것을 만났고 counter가 0이 아니면
//       counter -= 1;
//       end += 1;
//     } else {
//       end += 1;
//       temp += 1;
//     }
//   }
//   max = Math.max(max, temp);
//   start++;
// }
for (let start = 0, end = 0; start < n; start++) {
  while (end < n) {
    if (arr[end] % 2 == 0) end++;
    else {
      if (counter == k) break;
      counter++;
      end++;
    }
  }
  max = Math.max(max, end - start - counter);
  if (arr[start] % 2 == 1) counter -= 1;
}
console.log(max);
