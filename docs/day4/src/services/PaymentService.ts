import { Payment, PaymentMethod } from "../models/Payment";
import { OrderService } from "./OrderService";

export class PaymentService {
    private payments: Payment[] = []; // store all payments private
    private nextId = 1;
    constructor(private orderService: OrderService) {} // need OrderService to find order

    // Process payment for a given orderId
    processPayment(orderId: number, method: PaymentMethod): Payment {
        const order = this.orderService.getOrderById(orderId);
        if (!order) throw new Error("Order Not Found"); // order must Available

        if (order.paymentStatus === "paid") {
            throw new Error("Payment Already Paid"); // prevent double payment
        }

        if (order.orderStatus === "cancelled") {
            throw new Error("cannot pay for cancelled order"); // no pay for cancelled
        }

        // cod always success, others 90% success
        const isSuccess = method === "cod" ? true : Math.random() > 0.1;

        const payment: Payment = {
            id: this.nextId++,
            orderId,
            amount: order.totalAmount, // amount should be same as order total
            method,
            status: isSuccess ? "paid" : "failed",
            transactionId: `TXN${Date.now()}${orderId}`, // unique txn id
            createdAt: new Date(),
        };

        this.payments.push(payment);

        // Update order payment status based on success
        if (isSuccess) {
            order.paymentStatus = "paid"
        } else {
            order.paymentStatus = "failed"
        }
        return payment;
    }

    //refund payment 
    refundPayment(orderId:number):Payment{
        const payment= this.payments.find(p => p.orderId === orderId && p.status === "paid");
        if(!payment) throw new Error("Nosuccessful payment done");
        payment.status = "refunded"
        const order = this.orderService.getOrderById(orderId);
    if (order) order.paymentStatus = "pending";

    return payment;
  }

  getPaymentsByOrder(orderId: number): Payment[] {
    return this.payments.filter(p => p.orderId === orderId);
  }

  getAllPayments(): Payment[] {
    return [...this.payments];
  
    }
}