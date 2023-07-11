class PriorityQueue {
  constructor(comp) {
    this.heap = [];
    this.comp = comp;
  }
  isEmpty() {
    return this.heap.length == 0;
  }
  enq(value) {
    this.heap.push(value);
    this.upHeap(this.size() - 1);
  }
  size() {
    return this.heap.length;
  }
  isRoot(pos) {
    if (pos == 0) return true;
    return false;
  }
  left(pos) {
    return 2 * pos + 1;
  }
  right(pos) {
    return 2 * pos + 2;
  }
  parent(pos) {
    return parseInt((pos - 1) / 2);
  }
  swap(x, y) {
    let tmp = this.heap[x];
    this.heap[x] = this.heap[y];
    this.heap[y] = tmp;
  }
  hasLeft(pos) {
    if (this.left(pos) < this.size()) return true;
    return false;
  }
  hasRight(pos) {
    if (this.right(pos) < this.size()) return true;
    return false;
  }
  deq() {
    if (this.isEmpty()) {
      return null;
    }
    let min = this.heap[0];
    let last = this.heap.pop();
    if (this.size() != 0) {
      this.heap[0] = last;
      this.downHeap(0);
    }
    return min;
  }
  downHeap(pos) {
    while (this.hasLeft(pos)) {
      let s = null;
      if (!this.hasRight(pos)) {
        s = this.left(pos);
      } else if (this.comp(this.heap[this.left(pos)], this.heap[this.right(pos)] <= 0)) {
        s = this.left(pos);
      } else {
        s = this.right(pos);
      }
      if (this.comp(this.heap[s], this.heap[pos] < 0)) {
        this.swap(pos, s);
        pos = s;
      } else {
        break;
      }
    }
  }

  upHeap(pos) {
    while (!this.isRoot(pos)) {
      let p = this.parent(pos);
      if (this.comp(this.heap[p], this.heap[pos]) <= 0) {
        break;
      }
      this.swap(p, pos);
      pos = p;
    }
  }
}
