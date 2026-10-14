import {User,CreateUserInput,UpdateUserInput,Role} from "../models/user.model";
import { UserNotFoundError,DuplicateEmailError } from "../errors/app.errors";
import { UserRepository } from "../repositories/user.repository";
import { isValidEmail,isValidName } from "./validator";

//  repo is just storage
export class UserService{
    constructor(private repo:UserRepository){}

    // CREATE USER - valid and unique email
    create(input:CreateUserInput):User{
        // check name is atleast 2 chars, otherwise throw error
        if(!isValidName(input.name)) throw new Error("Name Must be Atleast 2 characters");
        // check email format like abc@gmail.com
        if(!isValidEmail(input.email)) throw new Error("Invalid Email Format");
        
        // check if email already exists in db
        const existing = this.repo.findByEmail(input.email);
        if(existing) throw new DuplicateEmailError(input.email); // duplicate found, stop here
        
        // all good, save it with active=true by default
        return this.repo.create({...input,active:true}as any);
    }

    // GET ALL USERS - with optional filters like role, active, sort
    getAll(filters?:{role?:Role;active?:boolean;sortByName?:boolean}):User[]{
        let users = this.repo.findAll(); 
        if(filters?.role)users = users.filter(u => u.role === filters.role); 
        if (filters?.active !== undefined) users = users.filter(u => u.active === filters.active);
        if (filters?.sortByName) users = [...users].sort((a,b) => a.name.localeCompare(b.name)); // sort A-Z
        return users;
    }

    // GET BY ID - if not found, throw custom error
    getById(id:number):User{
        const user = this.repo.findById(id);
        if(!user)throw new UserNotFoundError(id); 
        return user;
    }

    // SEARCH - search by name or email
    search(query:string):User[]{
        return this.repo.search(query);
    }

    // UPDATE USER - first check if user exists, then check duplicate email if email is changed
    update(id:number,input:UpdateUserInput):User{
        this.getById(id); // if not exists, it will throw error
        if(input.email){
            if(!isValidEmail(input.email)) throw new Error("Invalid email format");
            const dup = this.repo.findByEmail(input.email);
            if(dup && dup.id !== id) throw new DuplicateEmailError(input.email); // same email used by other user
    }
    // check name validation if name is being updated
    if (input.name && !isValidName(input.name)) throw new Error("Invalid name");
    return this.repo.update(id, input as any)!; // update in repo
  }

  // DEACTIVATE - not delete, just set active=false 
  deactivate(id: number): User {
    this.getById(id); // check exists first
    return this.repo.deactivate(id)!; // make active false
  }
}