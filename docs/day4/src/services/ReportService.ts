import { Order } from "../models/Order";
import { OrderService } from "./OrderService";

export class ReportService {
    constructor(private orderService: OrderService) {}
findById(id:number){
    return this.orderService.getAll().find(o => o.id === id);
}
serachByName(name:string){
    return this.orderService.getAll().filter(o => o.customerName.toLowerCase().includes(name.toLowerCase()))
}
filterByStatus(status:Order["orderStatus"]){
    return this.orderService.getAll().filter(o => o.orderStatus === status);
}
above500(){
    return this.orderService.getAll().filter(o => o.totalAmount > 500);
}
sortHighToLow(){
     return [...this.orderService.getAll()].sort((a,b) => b.totalAmount - a.totalAmount);
}
totalRevenue(){
    return this.orderService.getAll().filter(o => o.paymentStatus === "paid").reduce((sum,o) => sum + o.totalAmount,0);
}
countByStatus(){
    return this.orderService.getAll().reduce((acc: any, o) => {
            acc[o.orderStatus] = (acc[o.orderStatus] || 0) + 1;
            return acc;
        }, {});
}
 isEveryItemAvailable(orderId:number){
    const order = this.findById(orderId);
    if(!order)return false;
    return order.items.every(it => it.foodItem.isAvailable);
 }
 hasFailedPayment() {
        return this.orderService.getAll().some(o => o.paymentStatus === "failed");
    }


}



