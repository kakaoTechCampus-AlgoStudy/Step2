// class PriorityQueue {
//   constructor(comp) {
//     this.heap = [];
//     this.comp = comp;
//   }
//   isEmpty() {
//     return this.heap.length == 0;
//   }
//   enq(value) {
//     this.heap.push(value);
//     this.upHeap(this.size() - 1);
//   }
//   size() {
//     return this.heap.length;
//   }
//   isRoot(pos) {
//     if (pos == 0) return true;
//     return false;
//   }
//   left(pos) {
//     return 2 * pos + 1;
//   }
//   right(pos) {
//     return 2 * pos + 2;
//   }
//   parent(pos) {
//     return parseInt((pos - 1) / 2);
//   }
//   swap(x, y) {
//     let tmp = this.heap[x];
//     this.heap[x] = this.heap[y];
//     this.heap[y] = tmp;
//   }
//   hasLeft(pos) {
//     if (this.left(pos) < this.size()) return true;
//     return false;
//   }
//   hasRight(pos) {
//     if (this.right(pos) < this.size()) return true;
//     return false;
//   }
//   deq() {
//     if (this.isEmpty()) {
//       return null;
//     }
//     let min = this.heap[0];
//     let last = this.heap.pop();
//     if (this.size() != 0) {
//       this.heap[0] = last;
//       this.downHeap(0);
//     }
//     return min;
//   }
//   downHeap(pos) {
//     while (this.hasLeft(pos)) {
//       let s = null;
//       if (!this.hasRight(pos)) {
//         s = this.left(pos);
//       } else if (this.comp(this.heap[this.left(pos)], this.heap[this.right(pos)] <= 0)) {
//         s = this.left(pos);
//       } else {
//         s = this.right(pos);
//       }
//       if (this.comp(this.heap[s], this.heap[pos] < 0)) {
//         this.swap(pos, s);
//         pos = s;
//       } else {
//         break;
//       }
//     }
//   }

//   upHeap(pos) {
//     while (!this.isRoot(pos)) {
//       let p = this.parent(pos);
//       if (this.comp(this.heap[p], this.heap[pos]) <= 0) {
//         break;
//       }
//       this.swap(p, pos);
//       pos = p;
//     }
//   }
// }
/**
 * Expose `PriorityQueue`.
 */
module.exports = PriorityQueue;

/**
 * Initializes a new empty `PriorityQueue` with the given `comparator(a, b)`
 * function, uses `.DEFAULT_COMPARATOR()` when no function is provided.
 *
 * The comparator function must return a positive number when `a > b`, 0 when
 * `a == b` and a negative number when `a < b`.
 *
 * @param {Function}
 * @return {PriorityQueue}
 * @api public
 */
function PriorityQueue(comparator) {
  this._comparator = comparator || PriorityQueue.DEFAULT_COMPARATOR;
  this._elements = [];
}

/**
 * Compares `a` and `b`, when `a > b` it returns a positive number, when
 * it returns 0 and when `a < b` it returns a negative number.
 *
 * @param {String|Number} a
 * @param {String|Number} b
 * @return {Number}
 * @api public
 */
PriorityQueue.DEFAULT_COMPARATOR = function (a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  } else {
    a = a.toString();
    b = b.toString();

    if (a == b) return 0;

    return a > b ? 1 : -1;
  }
};

/**
 * Returns whether the priority queue is empty or not.
 *
 * @return {Boolean}
 * @api public
 */
PriorityQueue.prototype.isEmpty = function () {
  return this.size() === 0;
};

/**
 * Peeks at the top element of the priority queue.
 *
 * @return {Object}
 * @throws {Error} when the queue is empty.
 * @api public
 */
PriorityQueue.prototype.peek = function () {
  if (this.isEmpty()) throw new Error('PriorityQueue is empty');

  return this._elements[0];
};

/**
 * Dequeues the top element of the priority queue.
 *
 * @return {Object}
 * @throws {Error} when the queue is empty.
 * @api public
 */
PriorityQueue.prototype.deq = function () {
  var first = this.peek();
  var last = this._elements.pop();
  var size = this.size();

  if (size === 0) return first;

  this._elements[0] = last;
  var current = 0;

  while (current < size) {
    var largest = current;
    var left = 2 * current + 1;
    var right = 2 * current + 2;

    if (left < size && this._compare(left, largest) >= 0) {
      largest = left;
    }

    if (right < size && this._compare(right, largest) >= 0) {
      largest = right;
    }

    if (largest === current) break;

    this._swap(largest, current);
    current = largest;
  }

  return first;
};

/**
 * Enqueues the `element` at the priority queue and returns its new size.
 *
 * @param {Object} element
 * @return {Number}
 * @api public
 */
PriorityQueue.prototype.enq = function (element) {
  var size = this._elements.push(element);
  var current = size - 1;

  while (current > 0) {
    var parent = Math.floor((current - 1) / 2);

    if (this._compare(current, parent) <= 0) break;

    this._swap(parent, current);
    current = parent;
  }

  return size;
};

/**
 * Returns the size of the priority queue.
 *
 * @return {Number}
 * @api public
 */
PriorityQueue.prototype.size = function () {
  return this._elements.length;
};

/**
 *  Iterates over queue elements
 *
 *  @param {Function} fn
 */
PriorityQueue.prototype.forEach = function (fn) {
  return this._elements.forEach(fn);
};

/**
 * Compares the values at position `a` and `b` in the priority queue using its
 * comparator function.
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @api private
 */
PriorityQueue.prototype._compare = function (a, b) {
  return this._comparator(this._elements[a], this._elements[b]);
};

/**
 * Swaps the values at position `a` and `b` in the priority queue.
 *
 * @param {Number} a
 * @param {Number} b
 * @api private
 */
PriorityQueue.prototype._swap = function (a, b) {
  var aux = this._elements[a];
  this._elements[a] = this._elements[b];
  this._elements[b] = aux;
};

const fs = require('fs');
const testing = true;

const input = fs
  .readFileSync(testing ? './test.txt' : './dev/stdin')
  .toString()
  .split('\n');

const [n, m, k] = input[0].split(' ').map(Number);
// 도로를 포장하면 지나는데 걸리는 시간이 0
// 서울이 1번 도시, 포천이 n번 도시
// 도로를 포장했을때 1번에서 n번으로 가는 최단거리

// 포장 처리할수있는 경우의 수를 만들고 다익스트라 처리.
const graph = new Array(n + 1).fill(0).map(() => new Array());
let INF = 1e17;
for (let i = 1; i <= m; i++) {
  const [s, e, cost] = input[i].split(' ').map(Number);
  graph[s].push([e, cost]);
  graph[e].push([s, cost]);
}
let distance = [new Array(k + 1).fill(INF)];
for (let i = 1; i <= n; i++) distance[i] = new Array(k + 1).fill(INF);
dijkstra(1);
let result = INF;
for (let i = 0; i <= k; i++) {
  result = Math.min(result, distance[n][i]);
}
console.log(result);

function dijkstra(start) {
  let pq = new PriorityQueue((a, b) => b[0] - a[0]);
  pq.enq([0, start, 0]);
  distance[start][0] = 0;
  while (pq.size()) {
    let [dist, now, paved] = pq.deq();
    if (distance[now][paved] < dist) continue;
    for (let i of graph[now]) {
      let cost = dist + i[1];
      if (cost < distance[i[0]][paved]) {
        distance[i[0]][paved] = cost;
        pq.enq([cost, i[0], paved]);
      }
      if (paved < k && dist < distance[i[0]][paved + 1]) {
        distance[i[0]][paved + 1] = dist;
        pq.enq([dist, i[0], paved + 1]);
      }
    }
  }
}
