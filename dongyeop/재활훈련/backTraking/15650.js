const fs = require('fs');
const testing = true;
const [n, m] = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const arr = new Array(n).fill(0).map((v, index) => index + 1);
let answer = '';
function combination(arr, n) {
  const results = [];
  if (n === 1) {
    return arr.map((element) => [element]);
  } else {
    arr.forEach((item, index, origin) => {
      const combinations = combination(origin.slice(index + 1), n - 1);
      const attached = combinations.map((combi) => [item, ...combi]);
      results.push(...attached);
    });
  }
  return results;
}
combination(arr, m).forEach((value) => {
  answer += value.join(' ');
  answer += '\n';
});

console.log(answer);
