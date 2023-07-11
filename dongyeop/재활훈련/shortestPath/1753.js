// class Queue {
//   constructor() {
//     this.arr = [];
//     this.headIndex = 0;
//     this.tailIndex = 0;
//   }
//   enq(x) {
//     this.arr.push(x);
//     this.tailIndex += 1;
//   }
//   deq() {
//     this.arr.sort((a, b) => b[0] - a[0]);
//     this.tailIndex -= 1;
//     return this.arr.pop();
//   }
//   length() {
//     return this.tailIndex - this.headIndex;
//   }
// }

/**
 * @fileoverview Data Structure: Heap (Min Heap)
 *
 * 우선순위 큐를 구현하기 위한 루트노드에 최소값을 저장하는 Binary Heap
 * 즉, 부모 노드는 자식 노드보다 항상 작은 값을 유지해야 한다.
 *
 * chileLeftIndex = (parentIndex * 2) + 1
 * childRightIndex = (parentIndex * 2) + 2
 * parentIndex = (childIndex - 1) / 2
 */

module.exports = class Heap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
  getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

  peek = () => this.heap[0];

  insert = (key, value) => {
    const node = { key, value };
    this.heap.push(node);
    this.heapifyUp(); // 배열에 가장 끝에 넣고, 다시 min heap 의 형태를 갖추도록 한다.
  };

  // 최근에 삽입된 노드가 제 자리를 찾아갈 수 있도록 하는 메소드
  heapifyUp = () => {
    let index = this.heap.length - 1; // 계속해서 변하는 index 값
    const lastInsertedNode = this.heap[index];

    // 루트노드가 되기 전까지
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);

      // 부모 노드의 key 값이 마지막에 삽입된 노드의 키 값 보다 크다면
      // 부모의 자리를 계속해서 아래로 내린다.
      if (this.heap[parentIndex].key > lastInsertedNode.key) {
        this.heap[index] = this.heap[parentIndex];
        index = parentIndex;
      } else break;
    }

    // break 를 만나서 자신의 자리를 찾은 상황
    // 마지막에 찾아진 곳이 가장 나중에 들어온 노드가 들어갈 자리다.
    this.heap[index] = lastInsertedNode;
  };

  remove = () => {
    const count = this.heap.length;
    const rootNode = this.heap[0];

    if (count <= 0) return undefined;
    if (count === 1) this.heap = [];
    else {
      this.heap[0] = this.heap.pop(); // 끝에 있는 노드를 부모로 만들고
      this.heapifyDown(); // 다시 min heap 의 형태를 갖추도록 한다.
    }

    return rootNode;
  };

  // 변경된 루트노드가 제 자리를 찾아가도록 하는 메소드
  heapifyDown = () => {
    let index = 0;
    const count = this.heap.length;
    const rootNode = this.heap[index];

    // 계속해서 left child 가 있을 때 까지 검사한다.
    while (this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      // 왼쪽, 오른쪽 중에 더 작은 노드를 찾는다
      // rightChild 가 있다면 key의 값을 비교해서 더 작은 값을 찾는다.
      // 없다면 leftChild 가 더 작은 값을 가지는 인덱스가 된다.
      const smallerChildIndex =
        rightChildIndex < count && this.heap[rightChildIndex].key < this.heap[leftChildIndex].key ? rightChildIndex : leftChildIndex;

      // 자식 노드의 키 값이 루트노드보다 작다면 위로 끌어올린다.
      if (this.heap[smallerChildIndex].key <= rootNode.key) {
        this.heap[index] = this.heap[smallerChildIndex];
        index = smallerChildIndex;
      } else break;
    }

    this.heap[index] = rootNode;
  };
};

const Heap = require('./Heap');

/**
 * @fileoverview Data Structure: Priority Queue
 *
 * min heap 을 상속해서 구현한 우선순위 큐
 * min heap 의 insert 메소드가 enqueue 가 되고
 * min heap 의 remove 메소드가 dequeue 가 된다.
 */
module.exports = class PriorityQueue extends Heap {
  constructor() {
    super();
  }

  enqueue = (priority, value) => this.insert(priority, value);
  dequeue = () => this.remove();
  isEmpty = () => this.heap.length <= 0;
};
const fs = require('fs');
const testing = true;
const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const [v, e] = input[0].split(' ').map(Number);
const start = Number(input[1]);
const graph = [];

for (let i = 0; i <= v + 1; i++) {
  graph.push([]);
}
for (let i = 2; i <= e + 1; i++) {
  let [a, b, c] = input[i].split(' ').map(Number);
  graph[a].push([b, c]);
}

const distance = new Array(v + 1).fill(Infinity);

dijkstra(start);
for (let i = 1; i < v + 1; i++) {
  if (distance[i] === Infinity) console.log('INF');
  else console.log(distance[i]);
}
// 진입 노드에서 최단 거리 체크 큐에 넣음
// 해당 노드에서 최단 거리 큐에 넣음
function dijkstra(start) {
  let pq = new Queue();
  pq.enq([0, start]);
  distance[start] = 0;
  while (pq.length()) {
    let [dist, now] = pq.deq();
    if (distance[now] < dist) continue;
    for (let i of graph[now]) {
      let cost = dist + i[1];
      if (cost < distance[i[0]]) {
        distance[i[0]] = cost;
        pq.enq([cost, i[0]]);
      }
    }
  }
}
