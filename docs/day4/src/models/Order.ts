import { FoodItem } from "./FoodItem"; // importing FoodItem structure

// Order can be only in these 5 status
export type OrderStatus = "placed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";

// Payment can be only these 3 status
export type PaymentStatus = "pending" | "paid" | "failed";

//  which food and how many
export interface OrderItem {
    foodItem: FoodItem;
    quantity: number;
}

// Full order structure - everything should be in this format only
export interface Order {
    id: number;
    customerName: string;
    items: OrderItem[];
    subTotal: number;
    tax: number;
    deliveryCharge: number;
    totalAmount: number;
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: Date;
}