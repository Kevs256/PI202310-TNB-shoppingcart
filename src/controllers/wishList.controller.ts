import { Request, Response, NextFunction } from 'express';
import {wishlistModel,wishlistProductsModel} from '../models/wishList.model.js';


const setWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user, id_product} = req.params;
        const wish_product = await wishlistProductsModel.findOne({
            where: { id_product },
            include: [{
                model: wishlistModel,
                where: { id_user }
            }]
        })
        if(!wish_product){
            const wishlist = await wishlistModel.create({ id_user });
            await wishlistProductsModel.create({
                id_wishlist: wishlist.id_wishlist!, id_product
            });
            return res.status(200).json({status: true, message: 'Wishlist updated successfully'});
        }else{
            await wish_product.destroy();
        }
        res.status(200).json({status: true, message: 'Wishlist updated successfully'});
    } catch(error){
        console.log(error);
        res.status(500).json({status: false, message: "Internal error server"});
    }
}

const getWishListByPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {page} = req.query;
        let _page:number = 1;
        let _offset:number;
        if(page && typeof(page) === 'string'){
            if(/^\d+$/.test(page)){
                _page = parseInt(page);
            }else{
                return res.status(401).json({ success: true, message: "Invalid page" });
            }
        }
        _offset = _page * 6; 
        const products = await wishlistModel.findAll({
            limit: 6,
            offset: _offset,
        });
        return res.status(201).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ status: false });
    }
}

export default {
    setWishlist,
    getWishListByPage
}