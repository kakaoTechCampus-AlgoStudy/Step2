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

module.exports = Queue;
