const fs = require("fs");

BOJkey = true;

const input = fs
  .readFileSync(BOJkey ? "./ehddud1006/DP/18427/input.txt" : "./dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [N, M, H] = input.shift();

const dp = Array(H + 1).fill(0);
dp[0] = 1;

const studentsBlock = [];

for (let i = 0; i < N; i++) {
  studentsBlock.push(input.shift());
}

for (let i = 0; i < N; i++) {
  let data = [];
  for (let j = 0; j <= H; j++) {
    for (let k = 0; k < studentsBlock[i].length; k++) {
      if (dp[j] != 0 && j + studentsBlock[i][k] <= H)
        data.push([j + studentsBlock[i][k], dp[j]]);
    }
  }
  for (let [heigth, value] of data) {
    dp[heigth] = (dp[heigth] + value) % 10007;
  }
}
console.log(dp[H]);
