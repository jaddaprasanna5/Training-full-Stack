import type{Order} from "../src/types";

export function calculateOrderTotal(order:Order):number{
    let  total = 0;
    for(let item of order.items){
        total = total + item.product.price * item.quantity;
    }
    if(order.discount){
        if(order.discount.type === "percentage"){
            if(order.discount.value >= 0 && order.discount.value <= 100){
                total = total - (total * order.discount.value/100);
            }
        }
        else if(order.discount.type === "fixed"){
            if(order.discount.value >= 0){
                total = total - order.discount.value;
            }
        }
    }
    if(total < 0) total = 0;
    if(order.deliveryFee){
        total = total + order.deliveryFee;
    }
    return total;
}

export function filterBy<T>(items:T[],predicate:(item:T) => boolean):T[]{
    return items.filter(predicate);
}

export function groupBy<T, K extends string|number>(items:T[],keySelector:(item:T) => K):Record<K,T[]>{
    const result = {} as Record <K,T[]>;
    for (const item of items) {
    const key = keySelector(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
  }
  return result;
}