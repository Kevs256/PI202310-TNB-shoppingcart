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

const cartModel = db.define('cart', {
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

const cartProductsModel = db.define('cart', {
  id_cart_products: {
    primaryKey: true,
    type: DataTypes.NUMBER,
    autoIncrement: true
  },
  quantity: DataTypes.NUMBER,
  type: DataTypes.STRING,
  id_product: DataTypes.STRING,
  id_cart: {
    type: DataTypes.NUMBER,
    references: {
      model: 'cart',
      key: 'id_cart'
    }
  },
}, {
  freezeTableName: true,
  timestamps: false
}) as CartProductsModelStatic;

export default {
  cartModel,
  cartProductsModel
}
