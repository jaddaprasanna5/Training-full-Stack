export enum OrderStatus {
    PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED"
}

export type PaymentMethod = "UPI" | "CARD" | "COD" | "NET_BANKING";
export type ProductCategory = "ELECTRONICS" | "CLOTHING" | "GROCERY" | "BOOKS" | "HOME";

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  rating: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  city: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Discount {
  type: "percentage" | "fixed";
  value: number;
}

export interface Order {
  id: number;
  customerId: number;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  discount?: Discount;
  deliveryFee?: number;
  createdAt: Date;
}

export interface LoyaltyProfile {
  loyaltyPoints: number;
  tier: "SILVER" | "GOLD" | "PLATINUM";
}


export type CustomerWithLoyalty = Customer & {
  loyalty?: LoyaltyProfile;
}