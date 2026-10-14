export class UserNotFoundError extends Error{
    constructor(id:number){
        super(`User with id ${id} not Found`);
        this.name = "UserNotFoundError";
    }
}

export class DuplicateEmailError extends Error{
    constructor(email:string){
        super(`Email ${email} already Exists`)
        this.name = "DuplicateEmailError";
    }
}