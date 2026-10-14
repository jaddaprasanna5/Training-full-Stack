// generic repo - works for User, Task etc
export class InMemoryRepository<T extends { id: number }> {
  protected items: T[] = [] // main list like table
  private currentId = 1 // auto id counter

  create(item: any): T {
    let newItem = {...item, id: this.currentId++ } as T // give id
    this.items.push(newItem)
    return newItem
  }

  findAll(): T[] {
    return [...this.items] // return copy
  }

  findById(id: number) {
    // loop and find
    for(let i of this.items){
      if(i.id == id){
        return i
      }
    }
    return undefined // not found
  }

  update(id: number, data: any) {
    let idx = -1
    for(let j=0; j<this.items.length; j++){
      let curr = this.items[j] // store item first
      if(curr && curr.id == id){ // check curr exists then check id
        idx = j
        break
      }
    }
    if(idx == -1) return undefined // id not there

    let oldItem = this.items[idx]
    if(!oldItem) return undefined // extra safety

    this.items[idx] = {...oldItem,...data } as T // merge old + new
    return this.items[idx]
  }

  delete(id: number): boolean {
    let before = this.items.length
    let list: T[] = []
    for(let it of this.items){
      if(it.id!= id){
        list.push(it) // skip that id
      }
    }
    this.items = list
    return this.items.length!= before
  }
}