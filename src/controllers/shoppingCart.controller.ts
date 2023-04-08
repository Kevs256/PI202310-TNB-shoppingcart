import { Request, Response, NextFunction } from 'express';
import path from 'path';
import orderModel from '../models/order.model.js';

const insertShoppingCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order_info = req.body;
        try {
            const order = await orderModel.findOne({id_user: order_info.id_user});
        } catch (error) {
            return res.status(401).json({status: false, message: "No existe el carrito"});
        }
        
        const usuarioId = req.body.id_user; 
        const productoId = req.body.id_product; 
        const cantidad = req.body.quantity; 
    
        try {
            const carta = await orderModel.findOneAndUpdate(

              {id_user: usuarioId },
              {$addToSet: { producto: { id_product: productoId, quantity: cantidad } } },
              { new: true, useFindAndModify: false }
            )
            res.status(200).json({status: true, message: 'Cart updated successfully'});
        } catch (error) {
            return res.status(402).json({status: false, message:"No se pudo modificar"});
        }

    } catch(error){
        res.status(500).json({status: false, message: "Fallo total"});
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

/*const getAllCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const card = await CardModel.find();
        res.status(200).json({ status: true, data: card });
    } catch (error) {
        res.status(500).json({ status: false });
    }
}


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
    insertShoppingCart,
    //getAllCards,
    //modifyCardsById
}