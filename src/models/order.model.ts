import mongoose from 'mongoose';
import db from '../database/mongo.db.js';

const OrderModel = db.model('Order', new mongoose.Schema({
    id_user: { type: String, required: true },
    product: [
      {
        id_product: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice:{type: Number,required:true},
        discount:{type: Number,required:true},
      }
    ],
}));

export default OrderModel;
 