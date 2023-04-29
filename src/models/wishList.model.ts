import {Model, DataTypes, BuildOptions} from 'sequelize';
import db from '../database/database.js';
import { IWishlist_products, Iwishlist } from 'interfaces/IWishlist.js';

interface WishlistInstance extends Model<Iwishlist>, Iwishlist {}
type WishlistModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): WishlistInstance;
};

interface WishlistProductsInstance extends Model<IWishlist_products>, IWishlist_products {}
type WishlistProductsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions):WishlistProductsInstance;
};

export const wishlistModel = db.define('wishlist', {
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

export const wishlistProductsModel = db.define('wishlist_products', {
    id_wishlist_products: {
    primaryKey: true,
    type: DataTypes.NUMBER,
    autoIncrement: true
  },
  id_product: DataTypes.STRING,
  id_wishlist: DataTypes.NUMBER
}, {
  freezeTableName: true,
  timestamps: false
}) as WishlistProductsModelStatic;

wishlistModel.hasMany(wishlistProductsModel, { foreignKey: 'id_wishlist' });
wishlistProductsModel.belongsTo(wishlistModel, { foreignKey: 'id_wishlist' });