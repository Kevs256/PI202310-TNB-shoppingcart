import { Request, Response, NextFunction } from 'express';
import { orderModel, orderProductsModel } from '../models/order.model';
import sequelize from '../database/database';
import axios from 'axios';
import IProduct from '../interfaces/IProduct';
import { cartModel, cartProductsModel } from '../models/cart.model';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user} = req.params;
        const products = req.body.products as {id_product:string, quantity:string}[];

        const order = await orderModel.create({id_user});
        const _products = [];
        for(let i=0;i<products.length;i++){
            const {data} = await axios.get(`${process.env.URL_API_PRODUCTS}/products/${products[i].id_product}`);
            if(data){
                const product:IProduct = data.data;
                const _product = await orderProductsModel.create({
                    id_product: products[i].id_product, id_order: order.id_order!,
                    unit_price: product.price, quantity: parseInt(products[i].quantity),
                    discount: product.discount,
                });
                _products.push(_product);
            }
        }
        res.status(200).json({status: true, data: {order, products: _products}});
    } catch(error){
        console.log(error);
        res.status(500).json({status: false, message: "Internal error server"});
    }
}

const createOrderFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user} = req.params;
        
        const products = await cartProductsModel.findAll({
            include: [{
                model: cartModel,
                where: { id_user },
                attributes: []
            }],
            attributes: ['id_product', 'quantity']
        });

        if(products==null || products.length==0){
            return res.status(401).json({status: true, message: 'No shopping cart'});
        }

        const order = await orderModel.create({id_user});
        const _products = [];
        for(let i=0;i<products.length;i++){
            const {data} = await axios.get(`${process.env.URL_API_PRODUCTS}/products/${products[i].id_product}`);
            if(data){
                const product:IProduct = data.data;
                const _product = await orderProductsModel.create({
                    id_product: products[i].id_product, id_order: order.id_order!,
                    unit_price: product.price, quantity: products[i].quantity,
                    discount: product.discount,
                });
                _products.push(_product);
            }
        }

        res.status(200).json({status: true, data: {order, products: _products}});
    } catch(error){
        res.status(500).json({status: false, message: "Internal error server"});
    }
}

const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user, id_order} = req.params;
        const order = await orderModel.findOne({
            where: {
                id_user, id_order
            }
        });
        if(!order){
            return res.status(404).json({ status: true, message: 'Order not found' });
        }
        const orderProducts = await orderProductsModel.findAll({
            include: [{
                model: orderModel,
                where: {
                    id_order, id_user
                },
                attributes: []
            }],
            attributes: ['id_product', 'quantity', 'unit_price', 'discount']
        });

        return res.status(201).json({ success: true, data: orderProducts });
    } catch (error) {
        res.status(500).json({ status: false });
    }
}

const getOrdersByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user} = req.params;
        const orders = await sequelize.query('CALL get_orders(?)', {
            replacements: [id_user]
        });
        return res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ status: false });
    }
}

export default {
    createOrder,
    createOrderFromCart,
    getOrderById,
    getOrdersByUser
}