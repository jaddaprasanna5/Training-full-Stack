export class Repository<T extends {id:number}>{
    private items: T[] = [];//no one can access directly
    add(item:T):T{
        this.items.push(item);
        return item;
    }
    getAll():T[]{
        return this.items;
    }
    getById(id:number):T|undefined{
        return this.items.find(item => item.id === id);
    }
    update(id:number,changes:Partial<T>):T|undefined{
        const item = this.getById(id);
        if(!item){
            return undefined;
        }
        const index = this.items.findIndex(i => i.id === id);
        const updatedItem = { ...item, ...changes, id: item.id } as T;
        this.items[index] = updatedItem;
        return updatedItem;
    }
    delete(id:number):boolean{
        const index = this.items.findIndex(item => item.id === id);
        if(index === -1){
            return false;
        }
        this.items.splice(index,1);
        return true;
    }
    getCount():number{
        return this.items.length;
    }
}