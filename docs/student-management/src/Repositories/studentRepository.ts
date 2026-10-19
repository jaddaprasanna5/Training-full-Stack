// Generic class - T is item, K is ID type
// This can be used for Student, Teacher, anything

export class Repository<T, K> {
  private data: Map<K, T> = new Map();
  private getIdFunc: (item: T) => K;

  constructor(getIdFunc: (item: T) => K) {
    this.getIdFunc = getIdFunc;
  }

  // add new item
  add(item: T): void {
    let id = this.getIdFunc(item);
    this.data.set(id, item);
  }

  // get by id
  getById(id: K): T | undefined {
    return this.data.get(id);
  }

  // get all
  getAll(): T[] {
    return Array.from(this.data.values());
  }

  // update
  update(id: K, newItem: T): boolean {
    if (this.data.has(id) == false) {
      return false;
    }
    this.data.set(id, newItem);
    return true;
  }

  // delete
  delete(id: K): boolean {
    if (this.data.has(id)) {
      this.data.delete(id);
      return true;
    }
    return false;
  }
}