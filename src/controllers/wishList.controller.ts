import { Request, Response, NextFunction } from 'express';
import WishlistModel from '../models/wishList.model.js';

const setWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id_user} = req.params;
        const {id_product} = req.body;
        const wishlist = await WishlistModel.findOne({id_user});
        if(!wishlist){
            await WishlistModel.create({
                id_user, product: [id_product]
            });
            return res.status(200).json({status: true, message: 'Wishlist updated successfully'});
        }
        const idx = wishlist!.product.findIndex(product=>product==id_product);
        if(idx==-1){
            wishlist!.product.push(id_product);
        }
        await wishlist!.save();
        res.status(200).json({status: true, message: 'Wishlist updated successfully'});
    } catch(error){
        console.log(error);
        res.status(500).json({status: false, message: "Fallo total"});
    }
}

const getAllWhislists = async (req: Request, res: Response, next: NextFunction) => {
    const {id_user} = req.params;
    try {
        const wishlist = await WishlistModel.findOne({id_user});
        res.status(200).json({ status: true, data: wishlist });
    } catch (error) {
        res.status(500).json({ status: false });
    }
}

// const deleteShoppingCart = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const order_info = req.body;
//         try {
//             const order = await OrderModel.findOne({id_user: order_info.id_user});
//         } catch (error) {
//             return res.status(401).json({status: false, message: "No existe el carrito"});
//         }
  
//         const usuarioId: string = req.body.id_user;
//         const productoId: string = req.body.id_product;
//         try {
//           const carta = await OrderModel.findOneAndUpdate(
//             {id_user: usuarioId },
//             {$pull: {product: { id_product: productoId } } },
//             {new: true, useFindAndModify: false }
//           );
  
//         console.log(carta)
//           if (carta) {
//             return res.status(200).json({ status: true, message: "Product deleted successfully" });
//           } else {
//             return res.status(401).json({ status: false, message: "No existe el producto" });
//           }
//         } catch (error) {
//           return res.status(402).json({ status: false, message: "No se pudo modificar" });
//         }
//       } catch (error) {
//         res.status(500).json({ status: false, message: "Fallo total" });
//     }
//   };

const deleteWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_user } = req.params;
        const { id_product } = req.body;
        const wishlist = await WishlistModel.findOne({ id_user });
        if (!wishlist) {
            return res.status(401).json({ status: false, message: "No existe la lista de deseos" });
        }
        const idx = wishlist.product.findIndex(product => product == id_product);
        console.log(idx);
        
        if (idx === -1) {
            return res.status(401).json({ status: false, message: "No existe el producto en la lista de deseos" });
        }
        wishlist.product.splice(idx, 1);
        await wishlist.save();
        res.status(200).json({ status: true, message: "Producto eliminado correctamente de la lista de deseos" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Fallo total" });
    }
};



export default {
    setWishlist,
    getAllWhislists,
    deleteWishlist
}