import type { Order, Customer, Product } from "../src/types.js";
import { PaymentStatus } from "../src/types.js";
import { calculateOrderTotal } from "../src/utils.js";

export function getPaidOrders(orders:Order[]):Order[]{
    return orders.filter(o => o.paymentStatus === PaymentStatus.PAID);
}

export function calculateTotalRevenue(orders:Order[]):number{
    const paid = getPaidOrders(orders);
    let total = 0;
    for(let order of paid){
        total = total + calculateOrderTotal(order);
    }
    return total;
}

export function calculateTotalOrders(orders:Order[]):number{
    return orders.length;
}

export function averageOrderValue(orders:Order[]):number{
    const paid = getPaidOrders(orders);
    if(paid.length === 0) return 0;
    return calculateTotalRevenue(orders)/paid.length;
}

export function findHighestOrder(orders:Order[]):Order |undefined{
    const paid = getPaidOrders(orders);
    if(paid.length === 0) return undefined;
    
  let highest = paid[0];
  let maxTotal = calculateOrderTotal(highest);
  
  for (const order of paid) {
    const t = calculateOrderTotal(order);
    if (t > maxTotal) {
      maxTotal = t;
      highest = order;
    }
  }
  return highest;
}

export function findLowestOrder(orders: Order[]): Order | undefined {
  const paid = getPaidOrders(orders);
  if (paid.length === 0) return undefined;
  
  let lowest = paid[0];
  let minTotal = calculateOrderTotal(lowest);
  
  for (const order of paid) {
    const t = calculateOrderTotal(order);
    if (t < minTotal) {
      minTotal = t;
      lowest = order;
    }
  }
  return lowest;
}

export function revenueByCategory(orders: Order[]): Record<string, number> {
  const paid = getPaidOrders(orders);
  const map: Record<string, number> = {};
  
  for (const order of paid) {
    for (const item of order.items) {
      const cat = item.product.category;
      const amount = item.product.price * item.quantity;
      if (!map[cat]) map[cat] = 0;
      map[cat] += amount;
    }
  }
  return map;
}

export function revenueByCity(orders: Order[], customers: Customer[]): Record<string, number> {
  const paid = getPaidOrders(orders);
  const map: Record<string, number> = {};
  
  for (const order of paid) {
    const customer = customers.find(c => c.id === order.customerId);
    if (!customer) continue;
    const city = customer.city;
    const total = calculateOrderTotal(order);
    if (!map[city]) map[city] = 0;
    map[city] += total;
  }
  return map;
}
