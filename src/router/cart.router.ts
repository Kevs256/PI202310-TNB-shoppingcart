import { Router } from "express";
import shoppingCartController from "../controllers/cart.controller.js";

export default class shoppingCartRouter {

    router:Router;

    constructor(){
        this.router = Router();
        
        this.config();
    }

    private config(){
        this.router.route('/:id_user').get(shoppingCartController.getCartByIdUser);
        this.router.route('/:id_user').put(shoppingCartController.setQuantityProductFromCart); 
        this.router.route('/:id_user/products/:id_product').delete(shoppingCartController.deleteProductFromCart);
    }

}