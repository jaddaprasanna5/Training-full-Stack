import { EmployeeNotFoundError, DuplicateEmailError, DuplicateIdError } from "../errors/EmployeeErrors";

type hasId = { id: number }

function delay<T>(data: T, time: number = 300): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, time)
  })
}

export class Repository<T extends hasId> {
  protected items: Map<number, T>

  constructor(initialData: T[] = []) {
    this.items = new Map()
    for(let item of initialData){
      this.items.set(item.id, item) // adding to map
    }
  }

  async getAll(): Promise<T[]> {
    let allItems = Array.from(this.items.values())
    return delay(allItems)
  }

  async getById(id: number): Promise<T> {
    let item = this.items.get(id)
    if(!item){
      throw new EmployeeNotFoundError(id) // not found
    }
    return delay(item)
  }

  async create(item: T): Promise<T> {
    if(this.items.has(item.id)){
      throw new DuplicateIdError(item.id)
    }

    let newEmail = (item as any).email
    if(newEmail){
      for(let existing of this.items.values()){
        if((existing as any).email?.toLowerCase() == newEmail.toLowerCase()){
          throw new DuplicateEmailError(newEmail)
        }
      }
    }

    this.items.set(item.id, item)
    return delay(item, 500) // create takes more time
  }

  async update(id: number, updates: any): Promise<T> {
    let oldItem = this.items.get(id)
    if(!oldItem){
      throw new EmployeeNotFoundError(id)
    }
    let updated = {...oldItem,...updates, id: id } as T
    this.items.set(id, updated)
    return delay(updated, 500)
  }

  async delete(id: number): Promise<boolean> {
    let exists = this.items.get(id)
    if(!exists){
      throw new EmployeeNotFoundError(id)
    }
    this.items.delete(id)
    return delay(true, 300)
  }

  async find(filterFn: (item: T) => boolean): Promise<T[]> {
    let all = Array.from(this.items.values())
    let filtered: T[] = []
    for(let a of all){
      if(filterFn(a)) filtered.push(a)
    }
    return delay(filtered, 300)
  }
}