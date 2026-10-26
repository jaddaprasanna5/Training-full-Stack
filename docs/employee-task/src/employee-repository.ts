export class Repository<T,K>{
    private items:T[]= [];
    private getKey:(item:T) => K;
    constructor(getKeyFn:(item:T) => K){
        this.geyKey = getKeyFn;
    }
    
}