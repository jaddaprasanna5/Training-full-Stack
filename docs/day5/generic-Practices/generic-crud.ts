
class CrudService<T extends { id: number }> {
  private data: T[] = [];

  create(item: T): T {
    this.data.push(item);
    return item;
  }

  readAll(): T[] {
    return this.data;
  }

  findById(id: number): T | undefined {
    for (let x of this.data) {
      if (x.id == id) return x;
    }
    return undefined;
  }

  update(id: number, newData: Partial<T>): T | undefined {
    for (let item of this.data) {
      if (item.id == id) {
        let updated = {...item,...newData } as T;
        let idx = this.data.indexOf(item);
        this.data[idx] = updated;
        return updated;
      }
    }
    return undefined;
  }

  delete(id: number): boolean {
    let oldLen = this.data.length;
    this.data = this.data.filter((a) => a.id!= id);
    return this.data.length < oldLen;
  }
}

type User = { id: number; name: string };
type Product = { id: number; title: string };

const userService = new CrudService<User>();
userService.create({ id: 1, name: "Ravi" });
console.log(userService.readAll());

const productService = new CrudService<Product>();
productService.create({ id: 1, title: "Phone" });
console.log(productService.readAll());  