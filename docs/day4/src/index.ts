/* import { MenuService } from "./services/MenuService";

const menuService = new MenuService();
console.log("Available foods count:", menuService.getAvailableFoods().length); // should be 7
console.log("Get ID 2:", menuService.getFoodById(2)?.name); // should be Biryani
console.log("Main category:", menuService.filterByCategory("main").map(f => f.name));
 */

/* import { MenuService } from "./services/MenuService";
import { OrderService } from "./services/OrderService";

const menuService = new MenuService();
const orderService = new OrderService(menuService);

// PDF example: 2 Biryani + 1 Ice Cream = 609
const order1 = orderService.createOrder("Rahul", [
  { foodId: 2, quantity: 2 }, // Biryani 250*2 = 500
  { foodId: 5, quantity: 1 }, // Ice Cream 80*1 = 80
]);

console.log("Order 1 subtotal:", order1.subtotal); // 580
console.log("Order 1 tax:", order1.tax); // 29
console.log("Order 1 delivery:", order1.deliveryCharge); // 0
console.log("Order 1 total:", order1.totalAmount); // 609 MUST MATCH PDF

const order2 = orderService.createOrder("Sowmya", [
  { foodId: 1, quantity: 3 }, // Dosa 80*3 = 240
]);
console.log("Order 2 total (should be 240+12+40=292):", order2.totalAmount); */

/* import { MenuService } from "./services/MenuService";
import { OrderService } from "./services/OrderService";

const menuService = new MenuService();
const orderService = new OrderService(menuService);

const o1 = orderService.createOrder("Rahul", [{ foodId: 2, quantity: 1 }]);
const o2 = orderService.createOrder("Sowmya", [{ foodId: 1, quantity: 1 }]);

orderService.UpdateOrderStatus(1, "preparing");
orderService.UpdateOrderStatus(1, "out_for_delivery");
orderService.UpdateOrderStatus(1, "delivered");

orderService.cancelOrder(2);

console.log("Delivered orders:", orderService.getOrderByStatus("delivered").map(o => o.customerName)); // Rahul
console.log("Cancelled orders:", orderService.getOrderByStatus("cancelled").map(o => o.customerName)); // Sowmya

try {
  orderService.cancelOrder(1); // should fail because already delivered
} catch (e) {
  console.log("Block cancel delivered:", (e as Error).message);
} */

import { MenuService } from "./services/MenuService";
import { OrderService } from "./services/OrderService";
import { PaymentService } from "./services/PaymentService";

const menuService = new MenuService();
const orderService = new OrderService(menuService);
const paymentService = new PaymentService(orderService);

console.log(menuService.getAvailableFoods().map(f => `${f.id} - ${f.name} - Rs.${f.price}`).join("\n"));
const order1 = orderService.createOrder("Rahu",[{foodId:2,quantity:2},{foodId:5,quantity:1}]);
console.log(`Order ${order1.id} for ${order1.customerName} - Total Rs.${order1.totalAmount} (Sub:${order1.subTotal} Tax:${order1.tax} Delivery:${order1.deliveryCharge})`);
const order2 = orderService.createOrder("Sowmya", [{ foodId: 1, quantity: 2 }]);
console.log(`Order ${order2.id} for ${order2.customerName} - Total Rs.${order2.totalAmount}`);

const payment1 = paymentService.processPayment(order1.id ,"upi");
console.log(`Payment for Order ${order1.id}: ${payment1.status} - ${payment1.transactionId} - Method: ${payment1.method}`);
orderService.cancelOrder(order2.id);
console.log(`Order ${order2.id} cancelled`);
try {
  paymentService.processPayment(order2.id, "card");
} catch (e) {
  console.log(`Payment failed for cancelled order: ${(e as Error).message}`);
}
orderService.UpdateOrderStatus(order1.id, "preparing");
console.log(`Order ${order1.id} status: ${order1.orderStatus}`);
orderService.UpdateOrderStatus(order1.id, "out_for_delivery");
console.log(`Order ${order1.id} status: ${order1.orderStatus}`);
orderService.UpdateOrderStatus(order1.id, "delivered");
console.log(`Order ${order1.id} status: ${order1.orderStatus}`);    

console.log(`Delivered: ${orderService.getOrderByStatus("delivered").length} orders`);
console.log(`Cancelled: ${orderService.getOrderByStatus("cancelled").length} orders`);
console.log(`Total Payments: ${paymentService.getAllPayments().length}`);
console.log(`Main Course items: ${menuService.filterByCategory("main").map(f => f.name).join(", ")}`);
