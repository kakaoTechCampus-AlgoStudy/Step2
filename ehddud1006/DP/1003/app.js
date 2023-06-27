const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DP/1003/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number)
  .reverse();

const N = input.pop();
const answer = [];
const zeroDP = [];
const oneDP = [];
zeroDP[0] = 1;
zeroDP[1] = 0;
oneDP[0] = 0;
oneDP[1] = 1;

for (let i = 2; i <= 40; i++) {
  zeroDP[i] = zeroDP[i - 2] + zeroDP[i - 1];
  oneDP[i] = oneDP[i - 2] + oneDP[i - 1];
}

for (let i = 0; i < N; i++) {
  const target = input.pop();
  answer.push(`${zeroDP[target]} ${oneDP[target]}`);
}

console.log(answer.join("\n"));
