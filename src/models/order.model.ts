import {Model, DataTypes, BuildOptions} from 'sequelize';
import db from '../database/database.js';
import { IOrder, IOrder_products } from 'interfaces/IOrder.js';

interface OrderInstance extends Model<IOrder>, IOrder {}
type OrderModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions):OrderInstance;
};

interface OrderProductsInstance extends Model<IOrder_products>, IOrder_products {}
type OrderProductsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): OrderProductsInstance;
};

export const orderModel = db.define('order', {
    id_order: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      autoIncrement: true
    },
    id_user: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
}) as OrderModelStatic;

export const orderProductsModel = db.define('order_products', {
  id_order_products: {
    primaryKey: true,
    type: DataTypes.NUMBER,
    autoIncrement: true
  },
  id_product: DataTypes.STRING,
  quantity: DataTypes.NUMBER,
  unit_price: DataTypes.NUMBER,
  discount: DataTypes.NUMBER,
  id_order: DataTypes.NUMBER
}, {
  freezeTableName: true,
  timestamps: false
}) as OrderProductsModelStatic;

orderModel.hasMany(orderProductsModel, { foreignKey: 'id_order' });
orderProductsModel.belongsTo(orderModel, { foreignKey: 'id_order' });
