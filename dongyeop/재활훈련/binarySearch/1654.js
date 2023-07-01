const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

let [k, n] = input[0].split(' ').map(Number);
let cables = input.slice(1).map(Number);

let start = 1;
let end = Math.max(...cables);

let answer = 0;
while (start <= end) {
  let mid = parseInt((start + end) / 2);
  let total = BigInt(0);
  cables.forEach((cable) => {
    if (cable / mid) total += BigInt(parseInt(cable / mid));
  });
  if (total < n) {
    end = mid - 1;
  } else {
    start = mid + 1;
    answer = mid;
  }
}
console.log(answer);
