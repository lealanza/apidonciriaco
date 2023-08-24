import mongoose,{ Model, Schema, model, ObjectId, Types } from 'mongoose';
import { IProduct } from './products';
import { IUser } from './users';

export interface IProductOrder extends IProduct {
  product: string | Types.ObjectId;
  quantity: number;
}


export interface IOrder {
  user:ObjectId;
  createdAt: Date;
  updatedAt: Date;
  cellphone: string;
  direction: string;
  email: string;
  city: string;
  state: string;
  postalCode: string;
  products: IProductOrder[];
  total: number;
  status: string;
}

const orderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
  cellphone: { type: String, required: true },
  direction: { type: String, required: true },
  email: { type: String},
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  products: 
    [{
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    }],
  total: { type: Number},
  status: { type: String, required: true },
    
},
{
  timestamps: true,
    });

orderSchema.methods.toJSON = function () {
  const { __v,  ...order } = this.toObject();
  return order;

}

const Order: Model<IOrder> = model('Order', orderSchema);

export default Order;