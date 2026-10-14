import { User } from "../models/user.model";
import { InMemoryRepository } from "./base.repository";

// User repo - extends base generic repo, so we get create, findAll, findById, update, delete for free
export class UserRepository extends InMemoryRepository<User>{

    // FIND BY EMAIL - needed to check duplicate email before create/update
    findByEmail(email:string):User|undefined{
        // Test@gmail.com = test@gmail.com
        return this.items.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    // SEARCH - search by name or email, like PDF Gate 1 search feature
    search(query:string):User[]{
        const q = query.toLowerCase(); // make query lowercase for easy matching
        // if name contains q OR email contains q, return it
        return this.items.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }

    // DEACTIVATE - soft delete, not hard delete, just set active = false
    deactivate(id: number): User | undefined {
    const user = this.findById(id); // first find user
    if (user) {
      user.active = false; // set false in memory
      return this.update(id, { active: false } as any); 
    }
    return undefined; // if user not found
  }
}