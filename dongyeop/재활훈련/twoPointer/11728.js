const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const [n, m] = input[0].split(' ').map(Number);

const arr1 = input[1].split(' ').map(Number);
const arr2 = input[2].split(' ').map(Number);
//병합정렬
// let result = [];
// let start1 = 0;
// let start2 = 0;
// while (start1 < n && start2 < m) {
//   if (arr1[start1] < arr2[start2]) {
//     result.push(arr1[start1]);
//     start1++;
//   } else if (arr1[start1] > arr2[start2]) {
//     result.push(arr2[start2]);
//     start2++;
//   } else {
//     result.push(arr1[start1]);
//     result.push(arr2[start2]);
//     start1++;
//     start2++;
//   }
// }
// if (start2 === m) {
//   result.push(...arr1.slice(start1));
// } else {
//   result.push(...arr2.slice(start2));
// }
// 그냥 sorting
const result = arr1.concat(arr2).sort((a, b) => a - b);
console.log(result.join(' '));
