// Generic  - can store any type that has id, like User, Task 
export class InMemoryRepository<T extends { id: number }> {
  protected items: T[] = []; // main array where we store all data - acts like DB table
  private currentId = 1; // auto increment id

  // CREATE - add new item, give it new id
  create(item: Omit<T, "id">): T {
    const newItem = {...item, id: this.currentId++ } as T; 
    this.items.push(newItem); // push to array
    return newItem; // return created item
  }

  // GET ALL - return copy of array so outside code can't directly change original
  findAll(): T[] {
    return [...this.items]; 
  }

  // GET BY ID - find one item
  findById(id: number): T | undefined {
    return this.items.find(i => i.id === id);
  }

  // UPDATE - find index, then merge old data with new data
  update(id: number, data: Partial<Omit<T, "id">>): T | undefined {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return undefined; // id not found
    this.items[index] = {...this.items[index],...data } as T; // keep old + overwrite new
    return this.items[index];
  }

  // DELETE - remove by id, hard delete
  delete(id:number):boolean{
    const before = this.items.length;
    this.items = this.items.filter(i => i.id!== id); // keep all except this id
    return this.items.length!== before; // true if something deleted, false if not found
  }
}