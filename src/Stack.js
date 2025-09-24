export default class Stack {
  constructor(items = []) {
    this.items = Array.isArray(items) ? [...items] : [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    return this.items.length > 0 ? this.items.pop() : null;
  }

  peek() {
    return this.items.length > 0 ? this.items[this.items.length - 1] : null;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  getItems() {
    return [...this.items].reverse();
  }

  clear() {
    this.items = [];
  }
}
