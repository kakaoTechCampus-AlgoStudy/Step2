const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

// 각 플레이어의 목표는 자기 공보다 크기가 작고/ 색이 다른공을 선택하여
// 그 공의 크기만큼 점수를 얻는것.
const n = Number(input[0]);

let arr = [];
for (let i = 0; i < n; i++) {
  let [color, size] = input[i + 1].split(' ').map(Number);
  arr.push([color, size, i]);
}
//크기순 정렬
arr.sort((a, b) => a[1] - b[1]);

let summary = 0;
//색상별 누적합
let colorSummary = new Array(200001).fill(0);
let result = Array(n).fill(0);
let start = 0;
while (start < n) {
  let end = start;
  //같은 사이즈 마지막 인덱스 찾기
  while (end < n && arr[start][1] == arr[end][1]) end += 1;

  for (let i = start; i < end; i++) {
    colorSummary[arr[i][0]] += arr[i][1];
    summary += arr[i][1];
  }
  // 자기보다 작은 공들의 누적합 - 같은 색깔의 공 누적합
  for (let i = start; i < end; i++) {
    result[arr[i][2]] = summary - colorSummary[arr[i][0]];
  }
  start = end;
}
console.log(result.join('\n'));
