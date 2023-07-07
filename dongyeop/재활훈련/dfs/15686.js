const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

// 집과 가장 가까운 치킨집 사이의 거리를 치킨거리라고 한다.
// 치킨집 m개를 고르고 치킨 거리의 합이 최소가 되도록 하여라.

//1. 치킨집 m개를 고른후 이외는 지워보면서 거리계싼

const [n, m] = input[0].split(' ').map(Number);
const board = input.slice(1).map((e) => e.split(' ').map(Number));

// 치킨집 좌표 목록
const chickens = [];
const homes = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (board[i][j] === 2) {
      chickens.push([i, j]);
    } else if (board[i][j] === 1) {
      homes.push([i, j]);
    }
  }
}
const visited = new Array(chickens.length).fill(0);
// 조합
let combinations = [];
function dfs(start, selected) {
  if (selected.length === m) {
    combinations.push(selected);
    return;
  }
  for (let i = start; i < chickens.length; i++) {
    if (visited[i]) return;
    visited[i] = 1;
    dfs(i + 1, [...selected, chickens[i]]);
    visited[i] = 0;
  }
}
dfs(0, []);
let answer = Infinity;
combinations.forEach((chickens) => {
  const results = [];
  homes.forEach((home) => {
    let min = Infinity;
    for (const store of chickens) {
      min = Math.min(Math.abs(store[0] - home[0]) + Math.abs(store[1] - home[1]), min);
    }
    results.push(min);
  });
  answer = Math.min(
    answer,
    results.reduce((a, b) => a + b)
  );
});

console.log(answer);
// const dx = [-1, 1, 0, 0];
// const dy = [0, 0, -1, 1];
// function bfs(x,y) {
//   const q = new Queue();
//   q.enqueue([x,y])
//   const visited = Array.from({ length: n }, () => Array(n).fill(0));
//   while (true) {
//     const [x,y] = q.dequeue()
//     for (let i = 0; i < 4; i++) {
//         let nx = x+dx[i];
//         let ny = y+dy[i];
//         if(-1<nx && nx<n && -1<ny && ny<n && !visited[nx][ny]){
//             if(board[])
//             q.enqueue([nx,ny])
//         }
//     }
//   }
// }

// class Queue {
//   constructor() {
//     this.arr = {};
//     this.headIndex = 0;
//     this.tailIndex = 0;
//   }
//   enqueue(x) {
//     this.arr[this.tailIndex] = x;
//     this.tailIndex++;
//   }
//   dequeue() {
//     const target = this.arr[this.headIndex];
//     delete this.arr[this.headIndex];
//     this.headIndex++;
//     return target;
//   }
//   peek() {
//     return this.arr[this.headIndex];
//   }
//   length() {
//     return this.tailIndex - this.headIndex;
//   }
// }
