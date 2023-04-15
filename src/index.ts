import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import shoppingCartRouter from './router/shoppingCart.router.js';
import mongoDb from './database/mongo.db.js';
import wishListRouter from './router/wishList.router.js';

class Server{

    private app: express.Express

    constructor(){
        this.app = express();
        this.config();
        this.routes();
        this.start();
    }

    private config(){
        dotenv.config();
        new mongoDb().connect();
        this.app.use(cors({
            origin: process.env.CLIENT_HOST! || '*',
            credentials: true
        }));
        this.app.use(express.json());
    }

    private routes(){
        this.app.use('/cart',new shoppingCartRouter().router);
        this.app.use('/wishlist',new wishListRouter().router);
    }

    private start(){
        this.app.listen(parseInt(process.env.API_PORT || '3000'));
    }
}

new Server();