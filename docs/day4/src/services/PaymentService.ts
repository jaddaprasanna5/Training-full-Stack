import { Payment, PaymentMethod } from "../models/Payment";
import { OrderService } from "./OrderService";

export class PaymentService {
  private payments: Payment[] = []
  private nextId = 1

  constructor(private orderService: OrderService) {}

  processPayment(orderId: number, method: PaymentMethod): Payment {
    let order = this.orderService.getOrderById(orderId)
    if(!order){
      throw new Error("Order Not Found")
    }

    if(order.paymentStatus == "paid"){
      throw new Error("Payment Already Paid") // double payment check
    }

    if(order.orderStatus == "cancelled"){
      throw new Error("cannot pay for cancelled order")
    }

    let isSuccess = true
    if(method != "cod"){
      isSuccess = Math.random() > 0.1 // 90% success
    }

    let payment: Payment = {
      id: this.nextId++,
      orderId: orderId,
      amount: order.totalAmount,
      method: method,
      status: isSuccess ? "paid" : "failed",
      transactionId: "TXN" + Date.now() + orderId,
      createdAt: new Date()
    }

    this.payments.push(payment)

    if(isSuccess){
      order.paymentStatus = "paid"
    } else {
      order.paymentStatus = "failed"
    }

    return payment
  }

  // refund logic
  refundPayment(orderId: number): Payment {
    let payment: Payment | undefined
    for(let p of this.payments){
      if(p.orderId == orderId && p.status == "paid"){
        payment = p
      }
    }
    if(!payment){
      throw new Error("No successful payment found")
    }

    payment.status = "refunded"
    let order = this.orderService.getOrderById(orderId)
    if(order){
      order.paymentStatus = "pending"
    }

    return payment
  }

  getPaymentsByOrder(orderId: number): Payment[] {
    return this.payments.filter(p => p.orderId == orderId)
  }

  getAllPayments(): Payment[] {
    return [...this.payments]
  }
}