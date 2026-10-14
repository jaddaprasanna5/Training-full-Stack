import { FoodItem } from "./FoodItem";

// order status allowed
export type OrderStatus = "placed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";

// payment status
export type PaymentStatus = "pending" | "paid" | "failed";

// food + qty
export interface OrderItem {
  foodItem: FoodItem
  quantity: number
}

// full order - main structure
export interface Order {
  id: number
  customerName: string
  items: OrderItem[]
  subTotal: number
  tax: number
  deliveryCharge: number
  totalAmount: number
  orderStatus: OrderStatus
  paymentStatus: PaymentStatus
  createdAt: Date
}