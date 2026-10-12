// Payment can be done only with these 4 methods
export type PaymentMethod = "upi" | "card" | "cod" | "netbanking";

// Payment details for an order
export interface Payment {
    id: number;
    orderId: number;
    amount: number;
    method: PaymentMethod;
    status: "pending" | "paid" | "failed" | "refunded";
    transactionId?: string; 
    createdAt: Date;
}