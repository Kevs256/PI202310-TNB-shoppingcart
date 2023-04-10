import { Router } from "express";
import shoppingCartController from "../controllers/shoppingCart.controller.js";

class shoppingCartRouter {

    router:Router;

    constructor(){
        this.router = Router();
        
        this.config();
    }

    private config(){
        this.router.route('/shoppingCart/:id_user').get(shoppingCartController.getOrderById);
        this.router.route('/shoppingCart/add').put(shoppingCartController.setQuantityShoppingCart); 
    }

}

export default new shoppingCartRouter();