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

class Queue {
  constructor() {
    this.arr = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }
  enq(x) {
    this.arr[this.tailIndex] = x;
    this.tailIndex++;
  }
  deq() {
    const target = this.arr[this.headIndex];
    delete this.arr[this.headIndex];
    this.headIndex++;
    return target;
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
  .split('\n');

let line = 0;
while (true) {
  let [n, m] = input[line].split(' ').map(Number);
  if (n === 0 && m === 0) break;
  let [s, e] = input[line + 1].split(' ').map(Number);
  let graph = new Array(n).fill(0).map(() => new Array());
  let reversed_graph = new Array(n).fill(0).map(() => new Array());
  for (let i = line + 2; i < line + m + 2; i++) {
    const [u, v, p] = input[i].split(' ').map(Number);
    graph[u].push([v, p]);
    reversed_graph[v].push([u, p]);
  }

  // 최초 다익스트라
  let distance = new Array(n).fill(Infinity);
  dijkstra(s, graph);
  const removeTargets = bfs(s, e);
  // 최단거리 제거 그래프
  const newGraph = getNewGraph();
  distance = new Array(n).fill(Infinity);
  //   console.log(graph);
  //   console.log(removeTargets);
  //   console.log(newGraph);
  dijkstra(s, newGraph);
  console.log(distance[e] === Infinity ? -1 : distance[e]);
  line += m + 2;

  function getNewGraph() {
    let newGraph = new Array(n).fill(0).map(() => new Array());
    for (let i = 0; i < n; i++) {
      for (const [x, y] of graph[i]) {
        let check = true;
        for (let [rx, ry] of removeTargets) {
          if (i == rx && x == ry) check = false;
        }
        if (check) newGraph[i].push([x, y]);
      }
    }
    return newGraph;
  }

  function dijkstra(start, graph) {
    const pq = new PriorityQueue((a, b) => b[0] - a[0]);
    pq.enq([0, start]);
    distance[start] = 0;
    while (pq.size()) {
      const [dist, cur] = pq.deq();
      if (distance[cur] < dist) continue;
      for (const i of graph[cur]) {
        let cost = dist + i[1];
        if (cost < distance[i[0]]) {
          distance[i[0]] = cost;
          pq.enq([cost, i[0]]);
        }
      }
    }
  }

  function bfs(start, end) {
    let queue = new Queue();
    let visited = new Set();
    queue.enq(end);
    let removes = [];
    while (queue.length()) {
      let now = queue.deq();
      if (now == start) {
        continue;
      }
      for (let i of reversed_graph[now]) {
        let cost = distance[i[0]] + i[1];
        if (cost == distance[now]) {
          removes.push([i[0], now]);
          if (!visited.has(i[0])) {
            queue.enq(i[0]);
            visited.add(i[0]);
          }
        }
      }
    }
    return removes;
  }
}
