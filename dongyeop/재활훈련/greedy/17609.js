const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

const isPalindrom = (x) => {
  return x === x.split('').reverse().join('');
};

const n = Number(input[0]);
const data = input.slice(1);
for (const value of data) {
  if (isPalindrom(value)) {
    console.log(0);
  } else {
    let flag = false;
    let len = value.length;
    for (let i = 0; i < parseInt(len / 2); i++) {
      if (value[i] !== value[len - i - 1]) {
        if (isPalindrom(value.slice(0, i) + value.slice(i + 1, len))) flag = true;
        if (isPalindrom(value.slice(0, len - i - 1) + value.slice(len - i, len))) flag = true;
        break;
      }
    }
    if (flag) console.log(1);
    else console.log(2);
  }
}
