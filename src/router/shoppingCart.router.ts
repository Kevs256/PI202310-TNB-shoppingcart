import { Router } from "express";
import shoppingCartController from "../controllers/shoppingCart.controller.js";

export default class shoppingCartRouter {

    router:Router;

    constructor(){
        this.router = Router();
        
        this.config();
    }

    private config(){
        this.router.route('/:id_user').get(shoppingCartController.getOrderById);
        this.router.route('/:id_user').put(shoppingCartController.setQuantityShoppingCart); 
    }

}