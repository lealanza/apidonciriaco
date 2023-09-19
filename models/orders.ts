import mongoose,{ Model, Schema, model, ObjectId, Types } from 'mongoose';
import { IUser } from './users';


export interface IOrder {
  orderNumber:number;
  user:ObjectId;
  createdAt: Date;
  updatedAt: Date;
  cellphone: string;
  direction: string;
  city: string;
  state: string;
  postalCode: string;
  products: string[];
  total: number;
  status: string;
}

const orderSchema = new Schema<IOrder>({
  orderNumber:{type: Number},
  user: { type: Types.ObjectId, ref: 'User', required: true },
  cellphone: { type: String, required: true },
  direction: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  products: 
    [{
      product: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
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
