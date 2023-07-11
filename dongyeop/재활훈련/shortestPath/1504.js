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

const [n, m] = input[0].split(' ').map(Number);
const graph = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));
// const graph = new Array(n + 1).fill(0).map(() => new Array());
for (let i = 1; i <= m; i++) {
  const [s, e, cost] = input[i].split(' ').map(Number);
  //   graph[s].push([e, cost]);
  //   graph[e].push([s, cost]);
  graph[s][e] = cost;
  graph[e][s] = cost;
}
const [v1, v2] = input[m + 1].split(' ').map(Number);

const distance = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(Infinity));
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (i == j) {
      distance[i][j] = 0;
    }
  }
}

for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      distance[i][j] = Math.min(distance[i][j], graph[i][k] + graph[k][j]);
    }
  }
}
let answer = Math.min(distance[1][v1] + distance[v1][v2] + distance[v2][n], distance[1][v2] + distance[v2][v1] + distance[v1][n]);
if (answer === Infinity) {
  console.log(-1);
} else {
  console.log(answer);
}

// let distance = new Array(n + 1).fill(Infinity);

// let answer = getDistance(1, v1) + getDistance(v1, v2) + getDistance(v2, n);
// answer = Math.min(answer, getDistance(1, v2) + getDistance(v2, v1) + getDistance(v1, n));
// if (answer === Infinity) {
//   console.log(-1);
// } else {
//   console.log(answer);
// }

// function getDistance(start, end) {
//   distance = new Array(n + 1).fill(Infinity);
//   dijkstra(start);
//   console.log(distance[end]);
//   return distance[end];
// }

// function dijkstra(start) {
//   let pq = new PriorityQueue();
//   pq.enq([0, start]);
//   distance[start] = 0;
//   while (pq.size()) {
//     const [dist, now] = pq.deq();
//     if (distance[now] < dist) continue;
//     for (let i of graph[now]) {
//       let cost = dist + i[1];
//       if (cost < distance[i[0]]) {
//         distance[i[0]] = cost;
//         pq.enq([cost, i[0]]);
//       }
//     }
//   }
// }
