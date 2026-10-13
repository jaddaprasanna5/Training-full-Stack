export class OrderNotFoundError extends Error{
    constructor(id:number){
        super((`order ${id} Not Found`));
        this.name = "OrderNotFoundError";
    }
}
export class InvalidOrderOperationError extends Error {
  constructor(msg: string){ 
    super(msg); 
    this.name="InvalidOrderOperationError"; 
}
}
export class UnavailableFoodError extends Error {
  constructor(name: string){
     super(`${name} unavailable`); 
     this.name="UnavailableFoodError"; 
    }
}