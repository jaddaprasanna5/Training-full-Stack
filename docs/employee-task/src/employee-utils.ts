export function getFirst<T>(items:T[]):T|undefined{
    return items[0];
}

export function getLast<T>(items:T[]):T|undefined{
    if(items.length === 0)return undefined;
    return items[items.length-1];
}

export function groupBy<T, K extends string|number>(items:T[],keySelector:(item:T)=> K):Record <K, T[]>{
    const grouped = {} as Record<K,T[]>;
    for (const item of items) {
    const key = keySelector(item);
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
  }
  
  return grouped;
}

export function removeDuplicates<T>(items:T[]):T[]{
    return [...new Set(items)];
}

export function sortBySalary<T extends{salary:number}>(items:T[]):T[]{
    return [...items].sort((a,b) => a.salary - b.salary);
}

