import mongoose, {Model, model, Document, Schema} from 'mongoose'
export interface IImage {
  public_id:string
  url: string;
  secure_url:string
  path:string
}

interface IProduct extends Document {
  _id: string;
  title: string;
  price: number;
  ganancia: number;
  stock: number;
  description: string;
  category: string;
  images: IImage;
  date: Date;
}
const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  ganancia: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  images: { public_id: String, url: String, secure_url: String, path:String },
  date: { type: Date, default: Date.now },
});


productSchema.methods.toJSON = function(){
    const {__v, date, ...product} = this.toObject();
    return product;

}
const Product:Model<IProduct> = model('Product',productSchema)
export default Product;