import { User, CreateUserInput, UpdateUserInput, Role } from "../models/user.model";
import { UserNotFoundError, DuplicateEmailError } from "../errors/app.errors";
import { UserRepository } from "../repositories/user.repository";
import { isValidEmail, isValidName } from "./validator";

export class UserService {
  constructor(private repo: UserRepository) {} // repo injection

  // create user
  create(input: CreateUserInput): User {
    if(!isValidName(input.name)){
      throw new Error("Name must be atleast 2 characters") // name check
    }
    if(!isValidEmail(input.email)){
      throw new Error("Invalid email format") // email format check
    }

    let existing = this.repo.findByEmail(input.email)
    if(existing){
      throw new DuplicateEmailError(input.email) // email already used
    }

    return this.repo.create({...input, active: true } as any) // active default true
  }

  // get all with filters
  getAll(filters?: { role?: Role; active?: boolean; sortByName?: boolean }): User[] {
    let users = this.repo.findAll()

    if(filters?.role){
      let temp: User[] = []
      for(let u of users){
        if(u.role == filters.role) temp.push(u)
      }
      users = temp
    }

    if(filters?.active!= undefined){
      let temp: User[] = []
      for(let u of users){
        if(u.active == filters.active) temp.push(u)
      }
      users = temp
    }

    if(filters?.sortByName){
      users = [...users].sort((a,b) => a.name.localeCompare(b.name)) // A-Z sort
    }

    return users
  }

  // get by id
  getById(id: number): User {
    let user = this.repo.findById(id)
    if(!user){
      throw new UserNotFoundError(id) // not found error
    }
    return user
  }

  search(query: string): User[] {
    return this.repo.search(query) // search
  }

  // update user
  update(id: number, input: UpdateUserInput): User {
    this.getById(id) // check exists

    if(input.email){
      if(!isValidEmail(input.email)){
        throw new Error("Invalid email format")
      }
      let dup = this.repo.findByEmail(input.email)
      if(dup && dup.id!= id){
        throw new DuplicateEmailError(input.email) // other user has same email
      }
    }

    if(input.name &&!isValidName(input.name)){
      throw new Error("Invalid name") // name invalid
    }

    return this.repo.update(id, input as any)!
  }

  // deactivate - soft delete
  deactivate(id: number): User {
    this.getById(id) // check exists first
    return this.repo.deactivate(id)! // make inactive
  }
}