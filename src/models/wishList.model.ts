import {Model, DataTypes, BuildOptions} from 'sequelize';
import db from '../database/database.js';
import { ICart, ICart_products } from 'interfaces/ICart.js';
import { IWishlist_products, Iwishlist } from 'interfaces/IWishlist.js';

interface WishlistInstance extends Model<Iwishlist>, Iwishlist {}
type WishlistModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): WishlistInstance;
};

interface WishlistProductsInstance extends Model<IWishlist_products>, IWishlist_products {}
type WishlistProductsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions):WishlistProductsInstance;
};

const wishlistModel = db.define('wishlist', {
    id_wishlist: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      autoIncrement: true
    },
    id_user: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
}) as WishlistModelStatic;

const wishlistProductsModel = db.define('cart', {
    id_wishlist_products: {
    primaryKey: true,
    type: DataTypes.NUMBER,
    autoIncrement: true
  },
  id_product: DataTypes.STRING,
  type: DataTypes.STRING,
  id_wishlist: {
    type: DataTypes.NUMBER,
    references: {
      model: 'wishlist',
      key: 'id_wishlist'
    }
  },
}, {
  freezeTableName: true,
  timestamps: false
}) as WishlistProductsModelStatic;

export default {
    wishlistModel,
    wishlistProductsModel
}
