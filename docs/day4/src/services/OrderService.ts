import { OrderNotFoundError, InvalidOrderOperationError, UnavailableFoodError } from "../utils/errors";
import { Order, OrderItem } from "../models/Order";
import { MenuService } from "./MenuService";

export class OrderService {
  private orders: Order[] = []
  private nextId = 1

  constructor(private menuService: MenuService) {}

  // calc bill - subtotal, tax, delivery
  private calc(items: OrderItem[]) {
    let subTotal = 0
    for(let i of items){
      subTotal = subTotal + (i.foodItem.price * i.quantity)
    }
    let tax = Math.round(subTotal * 0.05) // 5% tax
    let deliveryCharge = 0
    if(subTotal < 500){
      deliveryCharge = 40
    }
    let totalAmount = subTotal + tax + deliveryCharge
    return { subTotal, tax, deliveryCharge, totalAmount }
  }

  createOrder(customerName: string, inputs: { foodId: number; quantity: number }[]): Order {
    let orderItems: OrderItem[] = []

    for(let inp of inputs){
      let food = this.menuService.getFoodById(inp.foodId)
      if(!food){
        throw new Error("Food ID " + inp.foodId + " not found")
      }
      if(food.isAvailable == false){
        throw new UnavailableFoodError(food.name) // like pizza
      }
      orderItems.push({ foodItem: food, quantity: inp.quantity })
    }

    let bill = this.calc(orderItems)

    let order: Order = {
      id: this.nextId++,
      customerName: customerName,
      items: orderItems,
      subTotal: bill.subTotal,
      tax: bill.tax,
      deliveryCharge: bill.deliveryCharge,
      totalAmount: bill.totalAmount,
      orderStatus: "placed", // starting status
      paymentStatus: "pending",
      createdAt: new Date()
    }

    this.orders.push(order)
    return order
  }

  getAll(): Order[] {
    return [...this.orders]
  }

  getOrderById(id: number): Order | undefined {
    for(let o of this.orders){
      if(o.id == id) return o
    }
    return undefined
  }

  // status change with flow validation
  UpdateOrderStatus(id: number, status: Order["orderStatus"]): Order {
    let order = this.getOrderById(id)
    if(!order){
      throw new OrderNotFoundError(id)
    }

    let flow: any = {
      placed: ["preparing", "cancelled"],
      preparing: ["out_for_delivery", "cancelled"],
      out_for_delivery: ["delivered", "cancelled"],
      delivered: [],
      cancelled: []
    }

    if(!flow[order.orderStatus].includes(status)){
      throw new InvalidOrderOperationError("Cannot change from " + order.orderStatus + " to " + status)
    }

    order.orderStatus = status
    return order
  }

  cancelOrder(id: number): Order {
    return this.UpdateOrderStatus(id, "cancelled")
  }

  getOrderByStatus(status: Order["orderStatus"]): Order[] {
    let res: Order[] = []
    for(let o of this.orders){
      if(o.orderStatus == status){
        res.push(o)
      }
    }
    return res
  }
}