import mongoose from 'mongoose';

const WishlistModel = mongoose.model('Wishlist', new mongoose.Schema({
    id_user: { type: String, required: true },
    product: [ String ]
}));

export default WishlistModel;