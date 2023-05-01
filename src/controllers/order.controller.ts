import { Request, Response, NextFunction } from 'express';
import { OrderProductsInstance, orderModel, orderProductsModel } from '../models/order.model';
import sequelize from '../database/database';
import {IProductInventory} from '../interfaces/IProduct';
import { cartModel, cartProductsModel } from '../models/cart.model';
import productsService from '../services/products.service';
import inventoryService from '../services/inventory.service';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user} = req.params;
        const products = req.body.products as IProductInventory[];

        const order = await orderModel.create({id_user});
        const _products:OrderProductsInstance[] = [];
        for(let i=0;i<products.length;i++){
            const product = await productsService.getById(products[i].id_product)
            if(product){
                const _product = await orderProductsModel.create({
                    id_product: products[i].id_product, id_order: order.id_order!,
                    unit_price: product.price, quantity: products[i].quantity,
                    discount: product.discount,
                });
                await productsService.addStock(products[i].id_product, -products[i].quantity);
                _products.push(_product);
            }
        }
        await inventoryService.addProducts(id_user, products);
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
        const _products:OrderProductsInstance[] = [];
        for(let i=0;i<products.length;i++){
            const product = await productsService.getById(products[i].id_product)
            if(product){
                const _product = await orderProductsModel.create({
                    id_product: products[i].id_product, id_order: order.id_order!,
                    unit_price: product.price, quantity: products[i].quantity,
                    discount: product.discount,
                });
                await productsService.addStock(products[i].id_product, -products[i].quantity);
                _products.push(_product);
            }
        }
        await inventoryService.addProducts(id_user, products);
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