import mongoose from 'mongoose';

const OrderModel = mongoose.model('Order', new mongoose.Schema({
    id_user: { type: String, required: true },
    product: [
      {
        id_product: { type: String, required: true },
        quantity: { type: Number, required: true }
      }
    ],
}));

export default OrderModel;
 