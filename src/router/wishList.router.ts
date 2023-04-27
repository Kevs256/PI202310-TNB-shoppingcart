import { Router } from "express";
import wishListController from "../controllers/wishList.controller";

export default class wishListRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        this.router.route('/:id_user').put(wishListController.setWishlist); 
        this.router.route('/:id_user').get(wishListController.getAllWhislists);
        this.router.route('/delete/:id_user').put(wishListController.deleteWishlist);
    }

}