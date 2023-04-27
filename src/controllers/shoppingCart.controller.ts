import { Request, Response, NextFunction } from 'express';
import orderModel from '../models/shoppingCart.model.js';

const setQuantityShoppingCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user} = req.params;
        const {id_product, quantity} = req.body;
        const order = await orderModel.findOne({id_user});
        if(!order){
            await orderModel.create({
                id_user, product: {id_product, quantity}
            });
            return res.status(200).json({status: true, message: 'Cart updated successfully'});
        }
        const idx = order!.product.findIndex(product=>product.id_product==id_product);
        if(idx==-1){
            order!.product.push({id_product, quantity});
        }else{
            order!.product[idx].quantity += quantity;
        }
        await order!.save();
        res.status(200).json({status: true, message: 'Cart updated successfully'});
    } catch(error){
        console.log(error);
        res.status(500).json({status: false, message: "Fallo total"});
    }
}

const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user} = req.params;
        const order = await orderModel.findOne({id_user});
        if(order){
            res.status(200).json({ status: true, data: order });
        }else{
            res.status(404).json({ status: true, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ status: false });
    }
}

const deleteShoppingCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_user } = req.params;
        const { id_product } = req.body;
        const order = await orderModel.findOne({ id_user });
        if (!order) {
            return res.status(404).json({ status: false, message: "Cart not found" });
        }
        const idx = order.product.findIndex((product) => product.id_product === id_product);
        if (idx === -1) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }
        order.product.splice(idx, 1);
        await order.save();
        return res.status(200).json({ status: true, message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};


export default {
    setQuantityShoppingCart,
    getOrderById,
    deleteShoppingCart
}