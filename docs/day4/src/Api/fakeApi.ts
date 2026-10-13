import { MenuService } from "../services/MenuService";
import { OrderService} from "../services/OrderService";
const wait = (ms:number) => new Promise(res => setTimeout(res,ms));
export class FakeApi{
    constructor(private menu:MenuService,private orderservice:OrderService){}
    async fetchMenu(){                      //fetching the menu
        await wait(1000);
        if(Math.random()< 0.3){
            throw new Error("Failed to fetch Menu");
        }
        return this.menu.getAll();
    }
    async fetchOrders(){   //fetching the orders
        await wait(1000);
        if(Math.random()< 0.3){
            throw new Error("Failed to fetch Orders");
        }
        return this.orderservice.getAll();
    }
    async confirmPayment(orderId: number) {                 //confirming payment
        await wait(800);
        if (Math.random() < 0.5) {
            throw new Error(`Payment failed for order ${orderId}`);
        }
        const order = this.orderservice.getOrderById(orderId);
        if (order) {
            order.paymentStatus = "paid";
        }
        return { orderId, status: "paid" as const, message: "Payment confirmed" };
    }
}

