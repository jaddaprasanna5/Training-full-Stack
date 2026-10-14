import { Order } from "../models/Order";
import { OrderService } from "./OrderService";

export class ReportService {
  constructor(private orderService: OrderService) {}

  findById(id: number){
    let all = this.orderService.getAll()
    for(let o of all){
      if(o.id == id) return o
    }
    return undefined
  }

  serachByName(name: string){ // search by customer name
    let all = this.orderService.getAll()
    let res = []
    for(let o of all){
      if(o.customerName.toLowerCase().includes(name.toLowerCase())){
        res.push(o)
      }
    }
    return res
  }

  filterByStatus(status: Order["orderStatus"]){
    return this.orderService.getAll().filter(o => o.orderStatus == status)
  }

  above500(){
    let list = this.orderService.getAll()
    let filtered = []
    for(let o of list){
      if(o.totalAmount > 500){
        filtered.push(o)
      }
    }
    return filtered
  }

  sortHighToLow(){
    let copy = [...this.orderService.getAll()]
    copy.sort((a,b) => {
      return b.totalAmount - a.totalAmount
    })
    return copy
  }

  totalRevenue(){
    let all = this.orderService.getAll()
    let sum = 0
    for(let o of all){
      if(o.paymentStatus == "paid"){
        sum = sum + o.totalAmount
      }
    }
    return sum
  }

  countByStatus(){
    let all = this.orderService.getAll()
    let acc: any = {}
    for(let o of all){
      if(acc[o.orderStatus] == undefined){
        acc[o.orderStatus] = 0
      }
      acc[o.orderStatus] = acc[o.orderStatus] + 1
    }
    return acc
  }

  isEveryItemAvailable(orderId: number){
    let order = this.findById(orderId)
    if(!order) return false
    for(let it of order.items){
      if(it.foodItem.isAvailable == false){
        return false
      }
    }
    return true
  }

  hasFailedPayment(){
    let all = this.orderService.getAll()
    for(let o of all){
      if(o.paymentStatus == "failed"){
        return true
      }
    }
    return false
  }
}