import mongoose, {Model, model, Schema} from 'mongoose'
import {ICategory} from './categories'

interface Category extends ICategory{
    name:string;
}
export interface IProduct{
    _id:string;
    title:String;
    price:Number;
    ganancia:Number;
    finalPrice:String;
    stock:Number;
    images:string;
    description:String;
    date:Date;
    category:Category;
}
const productSchema = new Schema<IProduct>({
    title:{type:String, required:true},
    price:{type:Number, required:true},
    ganancia:{type:Number, required:true},
    finalPrice:{type:String},
    stock:{type:Number, required:true},
    images:{type:String, required:true},
    description:{type:String, required:true},
    category:{type:Schema.Types.ObjectId, ref:'Category', required:true},
    date:{type:Date, default:Date.now}
})

productSchema.methods.toJSON = function(){
    const {__v, date, ...product} = this.toObject();
    return product;

}
const Product:Model<IProduct> = model('Product',productSchema)
export default Product;