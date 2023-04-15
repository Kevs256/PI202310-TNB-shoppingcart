import { Request, Response, NextFunction } from 'express';
import WishlistModel from '../models/wishList.model.js';

const setWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user} = req.params;
        const {id_product} = req.body;
        const wishlist = await WishlistModel.findOne({id_user});
        if(!wishlist){
            await WishlistModel.create({
                id_user, product: [id_product]
            });
            return res.status(200).json({status: true, message: 'Wishlist updated successfully'});
        }
        const idx = wishlist!.product.findIndex(product=>product==id_product);
        if(idx==-1){
            wishlist!.product.push(id_product);
        }
        await wishlist!.save();
        res.status(200).json({status: true, message: 'Wishlist updated successfully'});
    } catch(error){
        console.log(error);
        res.status(500).json({status: false, message: "Fallo total"});
    }
}

export default {
    setWishlist
}