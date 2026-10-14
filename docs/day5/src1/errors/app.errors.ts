export class UserNotFoundError extends Error {
  constructor(id: number){
    super("User with id " + id + " not found") // not found msg
    this.name = "UserNotFoundError"
  }
}

export class DuplicateEmailError extends Error {
  constructor(email: string){
    super("Email " + email + " already exists") // duplicate msg
    this.name = "DuplicateEmailError"
  }
}