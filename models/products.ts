import mongoose, {Model, model, Schema} from 'mongoose'

export interface IProduct{
    _id:string;
    title:String;
    price:Number;
    ganancia:Number;
    stock:Number;
    images:string[];
    description:String;
    date:Date;
    category:String;
}
const productSchema = new Schema<IProduct>({
    title:{type:String, required:true},
    price:{type:Number, required:true},
    ganancia:{type:Number, required:true},
    stock:{type:Number, required:true},
    images:[{type:String, required:true}],
    description:{type:String, required:true},
    category:{type:String, required:true},
    date:{type:Date, default:Date.now}
})

productSchema.methods.toJSON = function(){
    const {__v, date, ...product} = this.toObject();
    return product;

}
const Product:Model<IProduct> = model('Product',productSchema)
export default Product;