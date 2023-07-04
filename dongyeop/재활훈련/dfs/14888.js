const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);
const operator = input[2].split(' ').map(Number);
// 음수를 나눌때는 양수로 바꾼다음 음수로 치환
let max = -Infinity;
let min = Infinity;
dfs(arr[0], 1);
console.log(max === 0 ? 0 : max);
console.log(min === 0 ? 0 : min);
function dfs(value, depth) {
  if (depth === n) {
    max = Math.max(max, value);
    min = Math.min(min, value);
    return;
  }
  for (let i = 0; i < 4; i++) {
    if (i == 0 && operator[i] > 0) {
      operator[i] -= 1;
      dfs(value + arr[depth], depth + 1);
      operator[i] += 1;
    } else if (i == 1 && operator[i] > 0) {
      operator[i] -= 1;
      dfs(value - arr[depth], depth + 1);
      operator[i] += 1;
    } else if (i == 2 && operator[i] > 0) {
      operator[i] -= 1;
      dfs(value * arr[depth], depth + 1);
      operator[i] += 1;
    } else if (i == 3 && operator[i] > 0) {
      operator[i] -= 1;
      if (value < 0) {
        dfs(-1 * Math.floor((-1 * value) / arr[depth]), depth + 1);
      } else {
        dfs(Math.floor(value / arr[depth]), depth + 1);
      }
      operator[i] += 1;
    }
  }
}
