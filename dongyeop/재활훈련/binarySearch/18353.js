const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

let n = Number(input[0]);
let soldiers = input[1].split(' ').map(Number).reverse();

// 열외 시킴으로서 내림차순 정렬
// 병사의 수는 최대 2000
// 최대 n^2까지 가능

// n^2
// const LIS = (arr) => {
//   const lis = new Array(arr.length).fill(1);
//   for (let j = 0; j < n; j++) {
//     for (let i = 0; i < j; i++) {
//       if (arr[i] > arr[j]) {
//         lis[j] = Math.max(lis[j], lis[i] + 1);
//       }
//     }
//   }
//   return lis;
// };
// let max = 0;
// LIS(soldiers).forEach((value) => {
//   max = Math.max(max, value);
// });
// console.log(n - max);

// nlog(n)

let d = [0];
for (x of soldiers) {
  if (d[d.length - 1] < x) {
    d.push(x);
  } else {
    let index = 0;
    let start = 0;
    let end = d.length;
    while (start <= end) {
      let mid = parseInt((start + end) / 2);
      if (mid >= x) {
        end = mid - 1;
      } else {
        index = mid;
        start = mid + 1;
      }
    }
    d[index] = x;
  }
}
console.log(d);
console.log(n - (d.length - 1));
