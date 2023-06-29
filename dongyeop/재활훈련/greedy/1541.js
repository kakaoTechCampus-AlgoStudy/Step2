const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim();
const divided = input.split('-').map((e) =>
  e
    .split('+')
    .map(Number)
    .reduce((prev, cur) => prev + cur)
);
if (divided.length > 1) {
  console.log(divided[0] - divided.slice(1).reduce((prev, cur) => prev + cur));
} else {
  console.log(divided[0]);
}
