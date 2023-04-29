import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cartRouter from './router/cart.router.js';
import wishlistRouter from './router/wishlist.router.js';

class Server{

    private app: express.Express

    constructor(){
        this.app = express();
        this.config();
        this.routes();
        this.start();
    }

    private config(){
        this.app.use(cors({
            origin: process.env.CLIENT_HOST! || '*',
            credentials: true
        }));
        this.app.use(express.json());
    }

    private routes(){
        this.app.use('/cart', new cartRouter().router);
        this.app.use('/wishlist', new wishlistRouter().router);
    }

    private start(){
        this.app.listen(parseInt(process.env.API_PORT || '3000'));
    }
}

new Server();