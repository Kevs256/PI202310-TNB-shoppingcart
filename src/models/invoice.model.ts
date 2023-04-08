import mongoose from 'mongoose';
import db from '../database/mongo.db.js';

const InvoiceModel = db.model('Facturas', new mongoose.Schema({
    _id: String,
    id_user: String,
    date: String,
    product: [
        {
          id_product: { type: String, required: true },
          unitPrice:{type: Number,required:true},
          discount:{type: Number,required:true},
          quantity: { type: Number, required: true }
        }
      ],
    quantityTotal: Number,
    finalPrice: Number,
}));

export default InvoiceModel;
