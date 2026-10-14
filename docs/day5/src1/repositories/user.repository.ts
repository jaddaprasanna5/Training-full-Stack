import { User } from "../models/user.model";
import { InMemoryRepository } from "./base.repository";

// user repo extends base
export class UserRepository extends InMemoryRepository<User> {

  findByEmail(email: string): User | undefined {
    let lower = email.toLowerCase()
    for(let u of this.items){
      if(u.email.toLowerCase() == lower){
        return u // found
      }
    }
    return undefined
  }

  search(query: string): User[] {
    let q = query.toLowerCase() // for search
    let res: User[] = []
    for(let u of this.items){
      let nameMatch = u.name.toLowerCase().includes(q)
      let emailMatch = u.email.toLowerCase().includes(q)
      if(nameMatch || emailMatch){
        res.push(u)
      }
    }
    return res
  }

  deactivate(id: number): User | undefined {
    let user = this.findById(id) // check first
    if(!user) return undefined
    user.active = false
    return this.update(id, { active: false } as any) // update
  }
}