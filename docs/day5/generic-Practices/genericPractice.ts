function identity<T>(value:T):T{
    return value;
}
console.log(identity<number>(100));

function firstElement<T>(arr:T[]):T|undefined{
    if(arr.length == 0) {
        return undefined;
    }else{
        return arr[0];
    }
}
console.log(firstElement<string>([]));
console.log(firstElement<number>([10,20,30]));


function createPair<T>(a: T, b:T):[T,T]{
    return [a,b];
}
console.log(createPair<number>(10,20));
console.log(createPair<string>("A","B"));

function getLength<T>(arr:T[]):number{
    return arr.length;
}
console.log(getLength([1,2,3]));

function reverseArray<T>(arr:T[]):T[]{
    let copy = [...arr];
    copy.reverse();
    return copy;
}
console.log(reverseArray([1,2,3]));


interface Box<T>{
    value:T;
}
const Box1:Box<number> = {value:100};
const Box2:Box<string> = {value:"Prasanna"};
const Box3:Box<boolean> = {value:true};


class Repository<T extends {id:number}>{
    private items:T[] = [];

    add(item:T):T{
        this.items.push(item)
        return item;
    }
    getAll():T[]{
        return this.items;
    }
    getById(id:number):T|undefined{
        for(let x of this.items){
            if(x.id === id) return x;
        }
        return undefined;
    }
    update(id:number,data:Partial<T>):T|undefined{
        for(let item of this.items){
            if(item.id == id){
                let updated = {...item,...data} as T;
                let index = this.items.indexOf(item);
                this.items[index] = updated;
                return updated; 
            }
        }
        return undefined;
    }

    delete(id:number):boolean{
        let old = this.items.length;
        this.items = this.items.filter((a) => a.id != id);
        return this.items.length < old;
    }
}

type User = { id: number; name: string };
const users = new Repository<User>();
users.add({ id: 1, name: "Ravi" });
console.log(users.getAll());

//Generic Constraint
function getProperty<T,k extends keyof T>(obj:T,key :k){
    return obj[key];
}
const user = { id: 1, name: "Ravi", city: "Hyd" };
console.log(getProperty(user, "name")); // valid - Ravi
console.log(getProperty(user, "city")); // valid - Hyd
// console.log(getProperty(user, "age")); // this will show error - because age not in user
 

//Generic Merge
function merge<T,U>(a:T,b:U):T & U{
    let res = {...a,...b} as T & U;
    return res;
}
let finalObj = merge({name:"Ravi"},{age:23});
console.log(finalObj);
console.log(finalObj.name);
console.log(finalObj.age);

//Generic Stack 
class Stack<T>{
    private items:T[] = [];
    push(item:T){
        this.items.push(item);
    }
    pop():T|undefined{
        return this.items.pop();
    }
     peek(): T | undefined {
    if (this.items.length == 0) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length == 0;
  }
}


let stack = new Stack<number>();
stack.push(10);
stack.push(20);
console.log(stack.peek()); 
console.log(stack.pop()); 
console.log(stack.peek()); 

