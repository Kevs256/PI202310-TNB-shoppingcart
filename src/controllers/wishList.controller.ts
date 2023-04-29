import { Request, Response, NextFunction } from 'express';
import { wishlistModel, wishlistProductsModel} from '../models/wishlist.model.js';


const setWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user, id_product} = req.params;
        const wishlist = await wishlistModel.findOne({where: {id_user}});
        if(!wishlist){
            const _wishlist = await wishlistModel.create({ id_user });
            await wishlistProductsModel.create({
                id_wishlist: _wishlist.id_wishlist!, id_product
            });
            return res.status(200).json({status: true, message: 'Wishlist updated successfully'});
        }
        const wish_product = await wishlistProductsModel.findOne({
            where: { id_product },
            include: [{
                model: wishlistModel,
                where: { id_wishlist: wishlist.id_wishlist }
            }]
        });
        if(!wish_product){
            await wishlistProductsModel.create({
                id_wishlist: wishlist.id_wishlist!, id_product
            });
        }else{
            await wish_product.destroy();
        }
        res.status(200).json({status: true, message: 'Wishlist updated successfully'});
    } catch(error){
        console.log(error);
        res.status(500).json({status: false, message: "Internal error server"});
    }
}

const getIfProductInWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user, id_product} = req.params;
        const product = await wishlistProductsModel.findOne({
            include: [{
                model: wishlistModel,
                where: {id_user},
            }],
            where: {
                id_product
            }
        });
        return res.status(201).json({ success: true, data: product?true:false });
    } catch (error) {
        res.status(500).json({ status: false });
    }
}

const getWishListByPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user} = req.params;
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
        _offset = (_page-1) * 6;
        const products = await wishlistProductsModel.findAll({
            include: [{
                model: wishlistModel,
                where: {id_user},
                attributes: []
            }],
            attributes: ['id_product'],
            limit: 6,
            offset: _offset,
        });
        return res.status(201).json({ success: true, data: products.map(product=>product.id_product) });
    } catch (error) {
        res.status(500).json({ status: false });
    }
}

export default {
    setWishlist,
    getIfProductInWishlist,
    getWishListByPage
}