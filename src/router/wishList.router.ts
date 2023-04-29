import wishlistController from "../controllers/wishlist.controller.js";
import { Router } from "express";

export default class wishListRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        this.router.route('/:id_user').get(wishlistController.getWishListByPage);
        this.router.route('/:id_user/products/:id_product').get(wishlistController.getIfProductInWishlist); 
        this.router.route('/:id_user/products/:id_product').put(wishlistController.setWishlist); 
    }

}