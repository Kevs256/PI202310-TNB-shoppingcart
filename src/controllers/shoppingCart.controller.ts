import { Request, Response, NextFunction } from 'express';
import path from 'path';
import orderModel from '../models/order.model.js';

const setQuantityShoppingCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user, id_product, quantity} = req.body;
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
            order!.product[idx].quantity = quantity;
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
        res.status(200).json({ status: true, data: order });
    } catch (error) {
        res.status(500).json({ status: false });
    }
}


/*const totalDelete = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const order_info = req.body;
        try{
            const order = await pedidoModel.findOne({id_user: order_info.id_user});    
        }catch (error) {
            return res.status(401).json({status: false, message: "No existe el carrito"});
        }
        
    }
}*/

/*const modifyCardsById = async (req: Request, res: Response, next: NextFunction) => {
    let params = req.params;
    const card = await CardModel.findById(params.id_card);
    if (card == null) {
        res.status(404).json({ info: 'carta no existe' })
    } else {
        try {
            let body = req.body;
            await card.update({
                $set: {
                    name: body.name,
                    description: body.description,
                    id_hero: body.id_hero,
                    image: body.image,
                    card_type: body.card_type,
                    effects: body.effects
                }
            });
            res.status(200).json({status:true, info: 'Se actualizo la carta con exito'})
        } catch {
            res.status(500).json({ status: false, info: 'no se actualizo la carta' })
        }
    }
}*/



/*
const modifyCardsById = async (req: Request, res: Response, next: NextFunction) => {
    let params = req.params;
    const card = await CardModel.findById(params.id_card);
    if (card == null) {
        res.status(404).json({ info: 'carta no existe' })
    } else {
        try {
            let body = req.body;
            await card.update({
                $set: {
                    name: body.name,
                    description: body.description,
                    id_hero: body.id_hero,
                    image: body.image,
                    card_type: body.card_type,
                    effects: body.effects
                }
            });
            res.status(200).json({status:true, info: 'Se actualizo la carta con exito'})
        } catch {
            res.status(500).json({ status: false, info: 'no se actualizo la carta' })
        }
    }
}*/


export default {
    setQuantityShoppingCart,
    getOrderById,
    //getAllCards,
    //modifyCardsById
}