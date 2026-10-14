// payment methods allowed
export type PaymentMethod = "upi" | "card" | "cod" | "netbanking";

export interface Payment {
  id: number
  orderId: number
  amount: number
  method: PaymentMethod
  status: "pending" | "paid" | "failed" | "refunded"
  transactionId?: string
  createdAt: Date
}