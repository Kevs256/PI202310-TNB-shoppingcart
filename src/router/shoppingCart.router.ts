import { Router } from "express";
import shoppingCartController from "../controllers/shoppingCart.controller.js";

class shoppingCartRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        this.router.route('/shoppingCart/add').post(shoppingCartController.insertShoppingCart); 
    }

}

export default new shoppingCartRouter();