import { EmployeeNotFoundError,DuplicateEmailError,DuplicateIdError } from "../errors/EmployeeErrors";

// <T> means it can delay any type of data - Employee, number, string

function delay<T>(data:T,time:number = 300):Promise<T>{
    return new Promise((resolve) => 
    {
       setTimeout(() =>{
        resolve(data); // after 'time' ms, return the data
    },time);
});
}


// We need this because our Repository will search by id
type hasId = {id:number};

// Generic Class - T is placeholder for any type (Employee, Product, etc)
// T extends hasId means T must have id field
export class Repository<T extends hasId>{
    
    // Map to store all items. Key = id (number), Value = item (T)

    protected items: Map<number, T>;

    // Constructor runs when we do new Repository(data)

    constructor(initialData: T[] = []){
        this.items = new Map();
        // Loop through all initial data and put into Map
        for(const item of initialData){
            this.items.set(item.id,item); 
        }
    }

    //  Return all employees

    async getAll():Promise<T[]>{
        const allItems = Array.from (this.items.values()); 
        return delay(allItems); // Return after 300ms delay
    }

    //Find one employee by id
    async getById(id:number):Promise<T>{
        const item = this.items.get(id); // Get from Map using id
        if(!item){
            // If not found, throw custom error 
            throw new EmployeeNotFoundError(id);
        }
        return delay(item); 
    }

 // 3. CREATE - Add new employee to Map
async create(item:T):Promise<T>{
    // Check if id already exists in Map
    if(this.items.has(item.id)){
        throw new DuplicateIdError(item.id); // id duplicate error
    }

    // Check if email already exists (email must be unique)
    const newEmail = (item as any).email; // (item as any) because T might not have email, but Employee has
    if(newEmail){
        // Loop through all existing employees
        for(const  existing of this.items.values()){
            // Compare emails in lowercase (so Test@Gmail.com == test@gmail.com)
            if((existing as any).email?.toLowerCase() === newEmail.toLowerCase()){
                throw new DuplicateEmailError(newEmail); // email duplicate error
            }
        }
    }
    this.items.set(item.id,item); // Add new item to Map
return delay(item,500); // Return after 500ms (create takes more time)
}

// 4. UPDATE - Update existing employee


async update(id:number,updates:Partial<Omit<T,"id">>):Promise<T>{
        const oldItem = this.items.get(id); // Get old employee data
        if(!oldItem){
            throw new EmployeeNotFoundError(id);
        }
        // Merge old data + new updates. ... is spread operator 
      
        const updatedItem ={...oldItem,...updates,id:id} as T;
        this.items.set(id,updatedItem); // Save updated item back to Map
        return delay(updatedItem,500);
    }

// 5. DELETE - Remove employee by id
async delete(id:number):Promise<boolean>{
    const exists = this.items.get(id);
    if(!exists){
        throw new EmployeeNotFoundError(id); // Can't delete if not exists
    }
    this.items.delete(id); // Remove from Map
    return delay(true,300); // Return true = deleted successfully
}


async find(filterFn: (item: T) => boolean): Promise<T[]> {
    const all = Array.from(this.items.values()); 
    const filtered = all.filter(filterFn); // Apply your filter function
    return delay(filtered, 300);
  }

}