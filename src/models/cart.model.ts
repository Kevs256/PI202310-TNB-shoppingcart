import {Model, DataTypes, BuildOptions} from 'sequelize';
import db from '../database/database.js';
import { ICart, ICart_products } from 'interfaces/ICart.js';

interface CartInstance extends Model<ICart>, ICart {}
type CartModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CartInstance;
};

interface CartProductsInstance extends Model<ICart_products>, ICart_products {}
type CartProductsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CartProductsInstance;
};

export const cartModel = db.define('cart', {
    id_cart: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      autoIncrement: true
    },
    id_user: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
}) as CartModelStatic;

export const cartProductsModel = db.define('cart_products', {
  id_cart_products: {
    primaryKey: true,
    type: DataTypes.NUMBER,
    autoIncrement: true
  },
  quantity: DataTypes.NUMBER,
  id_product: DataTypes.STRING,
  id_cart: DataTypes.NUMBER,
}, {
  freezeTableName: true,
  timestamps: false
}) as CartProductsModelStatic;

cartModel.hasMany(cartProductsModel, { foreignKey: 'id_cart' });
cartProductsModel.belongsTo(cartModel, { foreignKey: 'id_cart' });