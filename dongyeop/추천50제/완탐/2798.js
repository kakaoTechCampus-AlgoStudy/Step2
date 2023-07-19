const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const [n, m] = input[0].split(' ').map(Number);
const cards = input[1].split(' ').map(Number);
// 조합
let answer = 0;
function combination(arr, count) {
  const result = [];
  if (count === 1) {
    return arr.map((e) => [e]);
  }
  arr.forEach((target, index, origin) => {
    const combinations = combination(origin.slice(index + 1), count - 1);
    combinations.forEach((combi) => {
      result.push([target, ...combi]);
    });
  });
  return result;
}
combination(cards, 3).forEach((combi) => {
  let sum = combi.reduce((a, b) => a + b);
  if (sum <= m) {
    answer = Math.max(answer, sum);
  }
});
console.log(answer);
