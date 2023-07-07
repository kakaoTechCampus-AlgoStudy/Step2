const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');
const n = Number(input[0]);
let ballons = input[1].split(' ').map(Number);
let answer = 0;
let arrow = new Array(1000001).fill(0);
// while (ballons.length) {
//   let curHeight = Math.max(...ballons);
//   for (let i = 0; i < ballons.length; i++) {
//     if (ballons[i] === curHeight) {
//       ballons[i] = 0;
//       curHeight--;
//     }
//     if (curHeight === 0) break;
//   }
//   answer += 1;
//   ballons = ballons.filter((ballon) => ballon != 0);
// }
// console.log(answer);

for (let x of ballons) {
  if (arrow[x] > 0) {
    arrow[x] -= 1;
    arrow[x - 1] += 1;
  } else {
    arrow[x - 1] += 1;
    answer += 1;
  }
}
console.log(answer);
