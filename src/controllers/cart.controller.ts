import { Request, Response, NextFunction } from 'express';
import {cartModel, cartProductsModel} from '../models/cart.model.js';

const setQuantityProductFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user} = req.params;
        const {id_product, quantity} = req.body;
        let cart = await cartModel.findOne({
            where: {id_user}
        });
        if(!cart){
            cart = await cartModel.create({id_user});
            await cartProductsModel.create({
                id_cart: cart.id_cart!,
                id_product, quantity
            });
            return res.status(200).json({status: true, message: 'Cart updated successfully'});
        }
        const product = await cartProductsModel.findOne({
            where: {
                id_cart: cart.id_cart!, id_product
            }
        });
        if(product){
            product.quantity! += quantity;
            await product.save();
        }else{
            await cartProductsModel.create({
                id_cart: cart.id_cart!,
                id_product, quantity
            });
        }
        res.status(200).json({status: true, message: 'Cart updated successfully'});
    } catch(error){
        console.log(error);
        res.status(500).json({status: false, message: "Fallo total"});
    }
}

const getCartByIdUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user} = req.params;
        const cart = await cartProductsModel.findAll({
            attributes: ['id_product', 'quantity'],
            include: [{
                model: cartModel,
                where: {id_user},
                attributes: []
            }]
        });
        if(cart){
            res.status(200).json({ status: true, data: cart });
        }else{
            res.status(404).json({ status: true, message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Internal error server' });
    }
}

const deleteProductFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_user, id_product } = req.params;
        const cart = await cartModel.findOne({
            where: {id_user}
        });
        if (!cart) {
            return res.status(404).json({ status: false, message: "Cart not found" });
        }
        const product = await cartProductsModel.findOne({
            where: {
                id_cart: cart.id_cart!, id_product
            }
        });
        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }
        await product.destroy();
        return res.status(200).json({ status: true, message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

export default {
    setQuantityProductFromCart,
    getCartByIdUser,
    deleteProductFromCart
}