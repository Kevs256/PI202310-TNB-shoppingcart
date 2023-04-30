import { Router } from "express";
import orderController from "../controllers/order.controller.js";

export default class orderRouter {

    router:Router;

    constructor(){
        this.router = Router();
        
        this.config();
    }

    private config(){
        this.router.route('/:id_user/orders').post(orderController.createOrder);
        this.router.route('/:id_user/orders').get(orderController.getOrdersByUser);
        this.router.route('/:id_user/orders/cart').post(orderController.createOrderFromCart);
        this.router.route('/:id_user/orders/:id_order').get(orderController.getOrderById);
    }

}