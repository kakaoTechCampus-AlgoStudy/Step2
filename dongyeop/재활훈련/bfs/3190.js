class Queue {
  constructor() {
    this.arr = {};
    this.tailIndex = 0;
    this.headIndex = 0;
  }
  enqueue(x) {
    this.arr[this.tailIndex] = x;
    this.tailIndex++;
  }
  dequeue() {
    const target = this.arr[this.headIndex];
    delete this.arr[this.headIndex];
    this.headIndex++;
    return target;
  }
  peek() {
    return this.arr[this.tailIndex];
  }
  length() {
    return this.tailIndex - this.headIndex;
  }
}

const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .trim()
  .split('\n');

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

const n = Number(input[0]);
const k = Number(input[1]);
const snakeDirections = [];
const board = new Array(n).fill(0).map((e) => new Array(n).fill(0));
for (let i = 2; i < k + 2; i++) {
  const [appleX, appleY] = input[i].split(' ').map(Number);
  board[appleX - 1][appleY - 1] = 2;
}

let l = Number(input[2 + k]);
for (let i = 3 + k; i < 3 + k + l; i++) {
  const [s, d] = input[i].split(' ');
  snakeDirections.push([Number(s), d]);
}
snakeDirections.reverse();

const q = new Queue();
q.enqueue([0, [[0, 0]], 0]);
while (q.length()) {
  let [direction, snake, time] = q.dequeue();
  if (l > 0 && time === snakeDirections[l - 1][0]) {
    if (snakeDirections[l - 1][1] === 'L') {
      direction = direction - 1;
      if (direction == -1) direction = 3;
    } else if (snakeDirections[l - 1][1] === 'D') {
      direction = (direction + 1) % 4;
    }
    l -= 1;
  }
  const nx = snake[0][0] + dx[direction];
  const ny = snake[0][1] + dy[direction];
  snake.forEach((item) => {
    if (item.toString() === [nx, ny].toString()) {
      console.log(time + 1);
      process.exit();
    }
  });
  if (-1 < nx && nx < n && -1 < ny && ny < n) {
    if (board[nx][ny] === 2) {
      board[nx][ny] = 0;
      q.enqueue([direction, [[nx, ny], ...snake], time + 1]);
    } else {
      snake.pop();
      q.enqueue([direction, [[nx, ny], ...snake], time + 1]);
    }
  } else {
    console.log(time + 1);
    break;
  }
}
