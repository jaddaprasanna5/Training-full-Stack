import { Order, OrderItem } from "../models/Order";
import { MenuService } from "./MenuService";

export class OrderService {
    private orders: Order[] = []; // private list to store all orders
    private nextId = 1; // auto increment id for orders

    constructor(private menuService: MenuService) {} // injecting MenuService to check food exists

    // Private helper to calculate bill - subtotal, tax 5%, delivery 40 if <500
    private calc(items: OrderItem[]) {
        const subTotal = items.reduce((sum, i) => sum + i.foodItem.price * i.quantity, 0);
        const tax = Math.round(subTotal * 0.05); // 5% tax
        const deliveryCharge = subTotal < 500 ? 40 : 0; // free delivery above 500
        return { subTotal, tax, deliveryCharge, totalAmount: subTotal + tax + deliveryCharge };
    }

    // Create new order - customer name and array of foodId + quantity
    createOrder(customerName: string, inputs: { foodId: number; quantity: number }[]): Order {
        // Convert foodId to actual FoodItem object
        const orderItems: OrderItem[] = inputs.map(inp => {
            const food = this.menuService.getFoodById(inp.foodId);
            if (!food) throw new Error(`Food ID ${inp.foodId} not found`); // id not found
            if (!food.isAvailable) throw new Error(`${food.name} is unavailable`); // like Pizza is unavailable
            return { foodItem: food, quantity: inp.quantity };
        });

        const { subTotal, tax, deliveryCharge, totalAmount } = this.calc(orderItems);

        const order: Order = {
            id: this.nextId++,
            customerName,
            items: orderItems,
            subTotal, tax, deliveryCharge, totalAmount,
            orderStatus: "placed", // first status is always placed
            paymentStatus: "pending",
            createdAt: new Date(),
        };

        this.orders.push(order);
        return order;
    }

    getAll(): Order[] {
        return [...this.orders]; // return copy so original is safe
    }

    // Find order by id
    getOrderById(id: number): Order | undefined {
        return this.orders.find(o => o.id === id)
    }

    // Update order status with flow check - cannot jump directly
    UpdateOrderStatus(id: number, status: Order["orderStatus"]): Order {
        const order = this.getOrderById(id);
        if (!order) throw new Error("Order Not found");

        // Allowed status flow - placed can go to preparing or cancelled etc
        const flow: Record<string, string[]> = {
            placed: ["preparing", "cancelled"],
            preparing: ["out_for_delivery", "cancelled"],
            out_for_delivery: ["delivered", "cancelled"],
            delivered: [], // final state - no more change
            cancelled: [] // final state
        };
        if (!flow[order.orderStatus]!.includes(status)) {
            throw new Error(`Cannot change from ${order.orderStatus} to ${status}`);
        }

        order.orderStatus = status;
        return order;
    }

    // Cancel order - just calls UpdateOrderStatus with cancelled
    cancelOrder(id: number): Order {
        return this.UpdateOrderStatus(id, "cancelled");
    }

    // Get all orders with same status - like all delivered orders
    getOrderByStatus(status: Order["orderStatus"]): Order[] {
        return this.orders.filter(o => o.orderStatus === status);
    }
}