import { Product, Customer, Order, OrderStatus, PaymentStatus } from "../src/types";

// --- 10 Products ---
export const products: Product[] = [
  { id: 1, name: "Wireless Mouse", category: "ELECTRONICS", price: 799, stock: 50, rating: 4.5 },
  { id: 2, name: "Mechanical Keyboard", category: "ELECTRONICS", price: 2999, stock: 5, rating: 4.8 },
  { id: 3, name: "Cotton T-Shirt", category: "CLOTHING", price: 599, stock: 100, rating: 4.2 },
  { id: 4, name: "Jeans", category: "CLOTHING", price: 1499, stock: 0, rating: 4.0 },
  { id: 5, name: "Organic Rice 5kg", category: "GROCERY", price: 450, stock: 200, rating: 4.6 },
  { id: 6, name: "TypeScript Book", category: "BOOKS", price: 650, stock: 30, rating: 4.9 },
  { id: 7, name: "Office Chair", category: "HOME", price: 8999, stock: 8, rating: 4.3 },
  { id: 8, name: "Smart Watch", category: "ELECTRONICS", price: 4999, stock: 15, rating: 4.4 },
  { id: 9, name: "Coffee Mug", category: "HOME", price: 299, stock: 3, rating: 4.1 },
  { id: 10, name: "Running Shoes", category: "CLOTHING", price: 2499, stock: 25, rating: 4.7 },
];

// --- 5 Customers ---
export const customers: Customer[] = [
  { id: 1, name: "Amit Sharma", email: "amit@gmail.com", city: "Hyderabad" },
  { id: 2, name: "Priya Patel", email: "priya@gmail.com", city: "Mumbai" },
  { id: 3, name: "Rahul Verma", email: "rahul@gmail.com", city: "Delhi" },
  { id: 4, name: "Sneha Reddy", email: "sneha@gmail.com", city: "Hyderabad" },
  { id: 5, name: "Vikram Singh", email: "vikram@gmail.com", city: "Bangalore" },
];

// --- 15 Orders ---
// Helper to get product by id quickly
const getProduct = (id: number) => products.find(p => p.id === id)!;

export const orders: Order[] = [
  { id: 101, customerId: 1, items: [{ product: getProduct(1), quantity: 2 }], status: OrderStatus.DELIVERED, paymentStatus: PaymentStatus.PAID, paymentMethod: "UPI", createdAt: new Date("2024-01-10") },
  { id: 102, customerId: 2, items: [{ product: getProduct(2), quantity: 1 }, { product: getProduct(1), quantity: 1 }], status: OrderStatus.SHIPPED, paymentStatus: PaymentStatus.PAID, paymentMethod: "CARD", discount: { type: "percentage", value: 10 }, deliveryFee: 50, createdAt: new Date("2024-01-12") },
  { id: 103, customerId: 1, items: [{ product: getProduct(3), quantity: 3 }], status: OrderStatus.PENDING, paymentStatus: PaymentStatus.UNPAID, createdAt: new Date("2024-01-15") },
  { id: 104, customerId: 3, items: [{ product: getProduct(8), quantity: 1 }], status: OrderStatus.DELIVERED, paymentStatus: PaymentStatus.PAID, paymentMethod: "NET_BANKING", createdAt: new Date("2024-02-01") },
  { id: 105, customerId: 4, items: [{ product: getProduct(5), quantity: 5 }], status: OrderStatus.DELIVERED, paymentStatus: PaymentStatus.PAID, paymentMethod: "COD", createdAt: new Date("2024-02-05") },
  { id: 106, customerId: 2, items: [{ product: getProduct(7), quantity: 1 }], status: OrderStatus.CANCELLED, paymentStatus: PaymentStatus.FAILED, createdAt: new Date("2024-02-10") },
  { id: 107, customerId: 5, items: [{ product: getProduct(10), quantity: 2 }], status: OrderStatus.DELIVERED, paymentStatus: PaymentStatus.PAID, paymentMethod: "UPI", discount: { type: "fixed", value: 500 }, createdAt: new Date("2024-02-15") },
  { id: 108, customerId: 1, items: [{ product: getProduct(2), quantity: 2 }], status: OrderStatus.PROCESSING, paymentStatus: PaymentStatus.PAID, paymentMethod: "CARD", createdAt: new Date("2024-03-01") },
  { id: 109, customerId: 3, items: [{ product: getProduct(6), quantity: 1 }, { product: getProduct(9), quantity: 2 }], status: OrderStatus.DELIVERED, paymentStatus: PaymentStatus.PAID, paymentMethod: "UPI", deliveryFee: 40, createdAt: new Date("2024-03-05") },
  { id: 110, customerId: 4, items: [{ product: getProduct(1), quantity: 10 }], status: OrderStatus.DELIVERED, paymentStatus: PaymentStatus.PAID, paymentMethod: "CARD", createdAt: new Date("2024-03-10") },
  { id: 111, customerId: 2, items: [{ product: getProduct(4), quantity: 1 }], status: OrderStatus.PENDING, paymentStatus: PaymentStatus.UNPAID, createdAt: new Date("2024-03-12") },
  { id: 112, customerId: 5, items: [{ product: getProduct(3), quantity: 5 }], status: OrderStatus.DELIVERED, paymentStatus: PaymentStatus.PAID, paymentMethod: "UPI", createdAt: new Date("2024-03-15") },
  { id: 113, customerId: 1, items: [{ product: getProduct(8), quantity: 1 }, { product: getProduct(1), quantity: 3 }], status: OrderStatus.DELIVERED, paymentStatus: PaymentStatus.PAID, paymentMethod: "CARD", discount: { type: "percentage", value: 5 }, createdAt: new Date("2024-03-20") },
  { id: 114, customerId: 3, items: [{ product: getProduct(9), quantity: 1 }], status: OrderStatus.DELIVERED, paymentStatus: PaymentStatus.REFUNDED, paymentMethod: "UPI", createdAt: new Date("2024-03-22") },
  { id: 115, customerId: 4, items: [{ product: getProduct(10), quantity: 1 }, { product: getProduct(3), quantity: 2 }], status: OrderStatus.DELIVERED, paymentStatus: PaymentStatus.PAID, paymentMethod: "UPI", createdAt: new Date("2024-03-25") },
];